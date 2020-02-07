<template>
  <div if="info-mobile" class="w-full">
    <div class="flex flex-col items-center m-2 p-2 bg-main1 rounded-lg">
      <div>
        <p
          class="text-center text-accent2 text-xl font-bold font-display text-sm leading-none"
        >
          {{ currentDay }}
        </p>
        <p class="text-center text-accent2 text-sm">{{ currentTime }}</p>
      </div>

      <div class="flex w-full items-center leading-none">
        <div class="flex w-full self-start items-center">
          <img :src="currentWeatherIcon" class="w-12 h-12" />
          <div class="text-left">
            <p class="text-accent2 text-sm">
              {{ Math.round(currentTemperature * 10) / 10 }}&#8457;
            </p>
            <p class="text-accent2 text-sm">
              {{ currentWeather.toLowerCase() }}
            </p>
          </div>
        </div>

        <div class="w-full text-right mr-2">
          <p class="text-accent2 font-bold font-main text-sm">
            {{ currentLocationCity }},
          </p>
          <p class="text-accent2 font-bold font-main text-sm">
            {{ currentLocationState }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "InfoMobile",
  data() {
    return {
      currentDay: "",
      currentTime: "",
      currentLong: null,
      currentLat: null,
      currentLocationCity: "",
      currentLocationState: "",
      currentWeather: "",
      currentTemperature: null,
      currentWeatherIcon: ""
    };
  },
  async mounted() {
    // User location.
    if (navigator.geolocation) {
      await navigator.geolocation.getCurrentPosition(async position => {
        // LocationIQ Geocode API - Getting our user's city & state via their coords.

        this.currentLong = position.coords.longitude;
        this.currentLat = position.coords.latitude;

        // Reverse Geocoding using MapBox's API
        await this.axios
          .get(
            `${process.env.VUE_APP_MAPBOX_API}/geocoding/v5/mapbox.places/${position.coords.longitude},${position.coords.latitude}.json?access_token=${process.env.VUE_APP_MAPBOX_KEY}`
          )
          .then(async response => {
            this.currentLocationCity =
              response.data.features[0].context[2].text;
            this.currentLocationState =
              response.data.features[0].context[3].text;
            await this.axios
              .get(
                `${process.env.VUE_APP_OPENWEATHER_API}lat=${position.coords.latitude}&lon=${position.coords.longitude}&APPID=${process.env.VUE_APP_OPENWEATHER_KEY}`
              )
              .then(weatherResponse => {
                this.currentWeather = weatherResponse.data.weather[0].main;
                this.currentWeatherIcon =
                  "http://openweathermap.org/img/wn/" +
                  weatherResponse.data.weather[0].icon +
                  "@2x.png";
                this.currentTemperature =
                  (weatherResponse.data.main.temp - 273.15) * (9 / 5) + 32;

                this.updateTime();
                this.$emit("show");
              })
              .catch(weatherError => {
                console.log(weatherError);
              });
          })
          .catch(error => {
            console.log(error);
          });
      });
    }
    // Refresh time.
    this.interval = setInterval(this.updateTime, 1000);
  },
  methods: {
    updateTime: function() {
      this.currentDay = moment().format("LL");
      this.currentTime = moment().format("h:mm a");
    }
  }
};
</script>

<style></style>
