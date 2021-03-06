package handlers

import (
	"encoding/hex"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"

	"github.com/18F/e-QIP-prototype/api/db"
	"github.com/18F/e-QIP-prototype/api/model"
	"github.com/18F/e-QIP-prototype/api/model/form"
)

func AllSections(w http.ResponseWriter, r *http.Request) {
	account := &model.Account{}
	account.WithContext(db.NewDB())

	// Valid token and audience while populating the audience ID
	_, err := checkToken(r, account, targetAudience())
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Get the account information from the data store
	context := db.NewDB()
	account.WithContext(context)
	if err := account.Get(); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	fmt.Fprint(w, string(form.Application(context, account.ID, false)))
}

func Hash(w http.ResponseWriter, r *http.Request) {
	account := &model.Account{}
	account.WithContext(db.NewDB())

	// Valid token and audience while populating the audience ID
	_, err := checkToken(r, account, targetAudience())
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Get the account information from the data store
	context := db.NewDB()
	account.WithContext(context)
	if err := account.Get(); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	hash := form.Hash(context, account.ID)
	fmt.Fprint(w, hex.EncodeToString(hash[:]))
}

func Section(w http.ResponseWriter, r *http.Request) {
	account := &model.Account{}
	account.WithContext(db.NewDB())

	// Valid token and audience while populating the audience ID
	_, err := checkToken(r, account, targetAudience())
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Get the account information from the data store
	context := db.NewDB()
	account.WithContext(context)
	if err := account.Get(); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	payloadType := r.FormValue("type")
	if payloadType == "" {
		http.Error(w, "No payload type provided", http.StatusInternalServerError)
		return
	}

	payload := &form.Payload{
		Type: payloadType,
	}
	entity, err := payload.Entity()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	if _, err = entity.Get(context, account.ID); err != nil {
		EncodeJSON(w, `{}`)
		return
	}

	EncodeJSON(w, entity.Marshal())
}

func Save(w http.ResponseWriter, r *http.Request) {
	account := &model.Account{}
	account.WithContext(db.NewDB())

	// Valid token and audience while populating the audience ID
	_, err := checkToken(r, account, targetAudience())
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Get the account information from the data store
	context := db.NewDB()
	account.WithContext(context)
	if err := account.Get(); err != nil {
		EncodeErrJSON(w, err)
		return
	}

	// Read the body of the request (which should be in JSON)
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		EncodeErrJSON(w, err)
		return
	}

	// Deserialize the initial payload from a JSON structure
	payload := &form.Payload{}
	if err := payload.Unmarshal(body); err != nil {
		EncodeErrJSON(w, err)
		return
	}

	// Extract the entity interface of the payload and validate it
	entity, err := payload.Entity()
	if err != nil {
		EncodeErrJSON(w, err)
		return
	}

	// Save to storage and report any errors
	if _, err = entity.Save(context, account.ID); err != nil {
		EncodeErrJSON(w, err)
		return
	}

	EncodeErrJSON(w, nil)
}

func SaveAttachment(w http.ResponseWriter, r *http.Request) {
	log.Println("Not implemented: /me/attachment")
}

func GetAttachment(w http.ResponseWriter, r *http.Request) {
	log.Println("Not implemented: /me/attachment/{id}")
}

func DeleteAttachment(w http.ResponseWriter, r *http.Request) {
	log.Println("Not implemented: /me/attachment/{id}/delete")
}
