
const app = Vue.createApp({

  data() {

    return {

      form: {

        fullName: "",
        dob: "",
        gender: "",

        visitors: "",
        children: "",

        accommodation: "",

        cardholder: "",
        cardNumber: "",
        expiry: "",
        cvv: ""

      },

      errors: {},

      generalError: "",

      places: [],

      isLoadingPlaces: false,

      placesError: "",

      selectedPlaces: [],

      accommodationOptions: [

        "No accommodation needed",
        "Forest View Hotel",
        "Totoro Family Inn",
        "Witch Valley Guesthouse",
        "Luxury Ghibli Resort"

      ],

      showSummary: false

    };

  },

  mounted() {

    this.loadPlaces();

  },

  methods: {

    async loadPlaces() {

      this.isLoadingPlaces = true;

      try {

        const response =
          await fetch("ghibli_park.json");

        const data =
          await response.json();

        this.places = data;

      } catch(error) {

        this.placesError =
          "Failed to load places.";

      } finally {

        this.isLoadingPlaces = false;

      }

    },

    togglePlace(place) {

      const exists =
        this.selectedPlaces.includes(place.id);

      if(exists) {

        this.selectedPlaces =
          this.selectedPlaces.filter(
            id => id !== place.id
          );

      } else {

        this.selectedPlaces.push(place.id);

      }

    },

    clearErrors() {

      this.errors = {};

      this.generalError = "";

    },

    validateForm() {

      let valid = true;

      if(!this.form.fullName) {

        this.errors.fullName =
          "Full name is required.";

        valid = false;
      }

      if(!this.form.dob) {

        this.errors.dob =
          "Date of birth is required.";

        valid = false;
      }

      if(!this.form.gender) {

        this.errors.gender =
          "Gender is required.";

        valid = false;
      }

      if(this.selectedPlaces.length === 0) {

        this.errors.places =
          "Please select at least one place.";

        valid = false;
      }

      if(!this.form.visitors) {

        this.errors.visitors =
          "Total visitors required.";

        valid = false;
      }

     if(this.form.children === "" || this.form.children === null) {

        this.errors.children =
          "Children number required.";

        valid = false;
      }

      if(!this.form.accommodation) {

        this.errors.accommodation =
          "Please choose accommodation.";

        valid = false;
      }

      if(!this.form.cardholder) {

        this.errors.cardholder =
          "Cardholder name required.";

        valid = false;
      }

      if(!this.form.cardNumber) {

        this.errors.cardNumber =
          "Card number required.";

        valid = false;
      }

      if(!this.form.expiry) {

        this.errors.expiry =
          "Expiry date required.";

        valid = false;
      }

      if(!this.form.cvv) {

        this.errors.cvv =
          "CVV required.";

        valid = false;
      }
      if(Number(this.form.children) > Number(this.form.visitors)) {

  this.errors.children =
    "Children cannot exceed total visitors.";

  valid = false;

}

      return valid;

    },

    generateItinerary() {

      this.clearErrors();

      this.showSummary = false;

      const valid =
        this.validateForm();

      if(!valid) {

        this.generalError =
          "There are mandatory items pending to be filled. Please complete the required fields.";

        return;
      }

      this.showSummary = true;

    }

  }

});

app.mount("#app");
