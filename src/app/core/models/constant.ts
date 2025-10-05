import { CurrentConditions } from "./current-conditions.type"
import { Forecast } from "./forecast.type";

export const CONSTANTS = {
  weather: {
    URL: 'https://api.openweathermap.org/data/2.5',
    APPID: '5a4b2d457ecbef9eb2a71e480b947604',
    ICON_URL: 'https://raw.githubusercontent.com/udacity/Sunshine-Version-2/sunshine_master/app/src/main/res/drawable-hdpi/'
  },
  locations: 'locations'
}

export const forecastListMock: Forecast = {
  city: {
    id: 1,
    name: 'paris',
    coord: {
      lon: 1235,
      lat: 797
    },
    country: 'france',
    population: 1000,
    timezone: 2
  },
  cod: 'code',
  message: 9,
  cnt: 11,
  list: [
    {
      dt: 11,
      sunrise: 13,
      sunset: 26,
      temp: {
        day: 2,
        min: 5,
        max: 9,
        night: 11,
        eve: 13,
        morn: 14
      },
      feels_like: {
        day: 1,
        night: 3,
        eve: 4,
        morn: 7
      },
      pressure: 17,
      humidity: 21,
      weather: [
        {
          id: 2,
          main: 'humide',
          description: 'test descript',
          icon: 'icon'
        }
      ],
      speed: 23,
      deg: 11,
      gust: 9,
      clouds: 8,
      pop: 12,
      rain: 10
    },
    {
      dt: 11,
      sunrise: 13,
      sunset: 26,
      temp: {
        day: 2,
        min: 5,
        max: 9,
        night: 11,
        eve: 13,
        morn: 14
      },
      feels_like: {
        day: 1,
        night: 3,
        eve: 4,
        morn: 7
      },
      pressure: 17,
      humidity: 21,
      weather: [
        {
          id: 2,
          main: 'humide',
          description: 'test descript',
          icon: 'icon'
        }
      ],
      speed: 23,
      deg: 11,
      gust: 9,
      clouds: 8,
      pop: 12,
      rain: 10
    },
    {
      dt: 11,
      sunrise: 13,
      sunset: 26,
      temp: {
        day: 2,
        min: 5,
        max: 9,
        night: 11,
        eve: 13,
        morn: 14
      },
      feels_like: {
        day: 1,
        night: 3,
        eve: 4,
        morn: 7
      },
      pressure: 17,
      humidity: 21,
      weather: [
        {
          id: 2,
          main: 'humide',
          description: 'test descript',
          icon: 'icon'
        }
      ],
      speed: 23,
      deg: 11,
      gust: 9,
      clouds: 8,
      pop: 12,
      rain: 10
    }
  ]
}

export const dataMock: CurrentConditions = {
  coord: {
    lon: 1235,
    lat: 797
  },
  weather: [
    {
      id: 1,
      main: 'main',
      description: 'test description',
      icon: 'icon'
    }
  ],
  base: '',
  main: {
    temp: 50,
    feels_like: 10,
    temp_min: 30,
    temp_max: 70,
    pressure: 35,
    humidity: 75
  },
  visibility: 11,
  wind: {
    speed: 200,
    deg:  40,
    gust:  21
  },
  clouds: {
    all: 27
  },
  dt: 5,
  sys: {
    type: 5,
    id: 9,
    country: 'France',
    sunrise: 6,
    sunset:  18
  },
  timezone: 2,
  id: 5,
  name: 'timezone',
  cod: 5,
}