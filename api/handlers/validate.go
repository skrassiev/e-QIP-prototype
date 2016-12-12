package handlers

import (
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/truetandem/e-QIP-prototype/api/model/form"
)

// ValidateAddress checks if an entire address is valid
func ValidateAddress(w http.ResponseWriter, r *http.Request) {
	var address form.AddressField
	DecodeJSON(r.Body, &address)
	log.Printf("Validating Full Address: [%v]\n", address)

	_, err := address.Valid()
	EncodeErrJSON(w, err)
}

// ValidateCity checks if a city is valid
func ValidateCity(w http.ResponseWriter, r *http.Request) {
	city := mux.Vars(r)["city"]
	log.Printf("Validating City: [%v]\n", city)

	_, err := form.CityField(city).Valid()
	stack := form.NewErrorStack("City", err)
	EncodeErrJSON(w, stack)
}

// ValidateZipcode checks if a zipcode is valid
func ValidateZipcode(w http.ResponseWriter, r *http.Request) {
	zipcode := mux.Vars(r)["zipcode"]
	log.Printf("Validating Zipcode: [%v]\n", zipcode)

	_, err := form.ZipcodeField(zipcode).Valid()
	stack := form.NewErrorStack("Zipcode", err)
	EncodeErrJSON(w, stack)
}

// ValidateState checks if a state is valid
func ValidateState(w http.ResponseWriter, r *http.Request) {
	state := mux.Vars(r)["state"]
	log.Printf("Validating State: [%v]\n", state)

	_, err := form.StateField(state).Valid()
	stack := form.NewErrorStack("State", err)
	EncodeErrJSON(w, stack)
}

// ValidateSSN checks if a social security number is valid
func ValidateSSN(w http.ResponseWriter, r *http.Request) {
	ssn := mux.Vars(r)["ssn"]
	field := form.SSNField{
		SSN:        ssn,
		Applicable: true,
	}

	_, err := field.Valid()
	stack := form.NewErrorStack("SSN", err)
	EncodeErrJSON(w, stack)
}

// ValidatePassport checks if a passport number is valid
func ValidatePassport(w http.ResponseWriter, r *http.Request) {
	passport := mux.Vars(r)["passport"]
	log.Printf("Validating Passport Number: [%v]\n", passport)

	_, err := form.PassportField(passport).Valid()
	stack := form.NewErrorStack("Passport", err)
	EncodeErrJSON(w, stack)
}

// ValidateApplicantName validates information for a persons name
func ValidateApplicantName(w http.ResponseWriter, r *http.Request) {
	log.Println("Validating Applicant Name")

	var name form.NameField
	DecodeJSON(r.Body, &name)
	_, err := name.Valid()
	EncodeErrJSON(w, err)
}

// ValidateApplicantBirthdate validates a persons birthdate
func ValidateApplicantBirthdate(w http.ResponseWriter, r *http.Request) {
	log.Println("Validating Applicant Birthdate")

	var name form.BirthdateField
	DecodeJSON(r.Body, &name)
	_, err := name.Valid()
	stack := form.NewErrorStack("Birthdate", err)
	EncodeErrJSON(w, stack)
}
