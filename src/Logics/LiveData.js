export default function registerWeatherComponent(editorInstance) {


editorInstance.DomComponents.addType("Live-data", {
  model: {
    defaults: {
      tagName: "div",
      draggable: true,
      droppable: false,
      editable: false,
      copyable: false,
      attributes: { class: "weather-box" },
      components: `<div>Loading...</div>`,
      traits: [
        {
          type: "text",
          name: "city",
          label: "City",
          changeProp: true,
        },
      ],
    },

    init() {
      this.on("change:city", () => {
        // render-safe update
        this.view?.updateWeatherSafe();
      });

      if (this.get("created")) {
        const city = prompt("Enter city name:");
        if (city) this.set("city", city.trim());
        this.set("created", false);
      }
    },

    updateWeather(city, el) {
      const apiKey = "01e2e4e4f1650ef4db27debcc53a2bea";
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

      el.innerHTML = `Loading weather for ${city}...`;

      fetch(url)
        .then(r => r.json())
        .then(data => {
          if (data.cod == "404") {
            el.innerHTML = `<b>${city}</b> not found 😢`;
            return;
          }

          el.innerHTML = `
            <div><b>${city}</b></div>
            <div>🌡️ Temp: ${data.main.temp}°C</div>
            <div>🌥️ ${data.weather[0].description}</div>
            <div>💧 Humidity: ${data.main.humidity}%</div>
          `;
        })
        .catch(() => {
          el.innerHTML = `Error loading weather for ${city}`;
        });
    }
  },

  view: {
    onRender() {
      this.updateWeatherSafe();
    },

    // Safe method: ensures element exists
    updateWeatherSafe() {
      const model = this.model;
      const city = model.get("city");
      const el = this.el;

      if (!el || !city) return;

      model.updateWeather(city, el);
    }
  }
});


  // BLOCK
  editorInstance.BlockManager.add("Live-data", {
    label: "Live-data",
    category: "Insert",
    content: {
      type: "Live-data",
      created: true,
    },
  });
}
