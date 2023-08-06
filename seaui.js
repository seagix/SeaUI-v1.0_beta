/* SeaUI @v1b*/
var version = 1.0
/*
Contributers: 
  1) Saneesh (Developer)
        Github: @saneeshzzz
        Instagram: @saneesh_oinam
  2) DZCoder14 (Documentation)
        Credentials Unknown

Addons:
 1) LocalBase (SeaGiX)

Copyright SeaGiX Corporation 2023
All Rights are Reserved.
*/
let screens = [],
  ctgle = {};

function getStateClr(e) {
  if (e = "success") return "#12B215"
}

function getStateBg(e) {
  if (e = "success") return "#8CE08D"
}
const __properties = {
  saveToggles: false,
  themes: false,
  screen: {
    DEFAULT_screenBackground: "#00000059",
  },
  dialog: {
    DEFAULT_screenBackground: "#FFFFFF22"
  },
  form: {
    background: {
      dark: "black",
      _DEFAULT: "white"
    },
    boxShadow: {
      dark: "0 0 2px #FFFFFF99",
      _DEFAULT: "0 0 4px #00000059"
    }
  }
}
class LocalBase {
  /*version 1.0*/
  database(name = "database") {
    if (!localStorage.getItem(name)) localStorage.setItem(name, "{}")
    return {
      add(key, value) {
        this.data = JSON.parse(localStorage.getItem(name));
        this.data[key] = value;
        localStorage.setItem(name, JSON.stringify(this.data))
      },
      clear() {
        localStorage.setItem(name, "{}")
      },
      __dataList() {
        return JSON.parse(localStorage.getItem(name))
      }
    }
  }
}
const lbase = new LocalBase();
class Settings {
  constructor() { this.appTheme = "light" }
  saveToggles(bool = true) {
    __properties.saveToggles = bool;
    if (!bool) lbase.database("__toggles").clear();
  }
  enableThemes(bool = true) {
    __properties.themes = true;
  }
  applyTheme() {
    if (this.appTheme === "dark") {
      document.body.style.background = "black"
      document.body.style.color = "white"
    }
  }
}
class SeaUI {
  constructor() {
    this.parent = document.body;
    this.styles = Object.keys(document.body.style);
    this.count = 0;
    this.root = {
      path: `ID${this.get_RANDOM(15)}`,
      spinner: `ID${this.get_RANDOM(15)}`,
      rotator: `ID${this.get_RANDOM(15)}`,
      dash: `ID${this.get_RANDOM(15)}`,
      fadeIn: `ID${this.get_RANDOM(10)}`,
      fadeOut: `ID${this.get_RANDOM(10)}`
    }
    document.head.append(this.component("style")({
      innerHTML: `
    .${this.root.path} {
      stroke-dasharray: 190;
      stroke-dashoffset: 180;
      -webkit-transform-origin: center;
      -ms-transform-origin: center;
      transform-origin: center;
    }

    .${this.root.spinner} {
      -webkit-animation: ${this.root.rotator} 1.5s linear infinite;
      animation: ${this.root.rotator} 1.5s linear infinite;
      border-radius: 50%;
    }

    @keyframes ${this.root.rotator} {
      0% {
        transform: rotate(0deg)
      }

      100% {
        transform: rotate(360deg);
      }
    }
    @keyframes ${this.root.dash} {0% {transform: rotate(0deg);stroke-dashoffset: 180;}50% {stroke-dashoffset: 50;transform: rotate(120deg);}100% {stroke-dashoffset: 180;transform: rotate(360deg);}}
    @keyframes ${this.root.fadeIn}{
      0%{opacity: 0%;}
      100%{opacity: 100%;}
    }
    @keyframes ${this.root.fadeOut}{
      0%{opacity: 100%;}
      100%{opacity: 0%;}
    }
`
    }))
  }
  getToggleValue(name){
    this.tToggleValue = lbase.database("__toggles").__dataList()[name];
    if(this.tToggleValue) return this.tToggleValue[1];
    else return false;
  }
  setParent(str = "body"){
    if(str === "body") return this.parent = document.body;
    this.parent = document.body.querySelector(str)
  }
  main(arr) {
    if (typeof arr != "object" || !arr.length) arr = [arr];
    for (let i = 0; i < arr.length; i++) {
      this.parent.append(arr[i])
    }
  }
  screens() {
    return screens
  }
  html(arr) {
    if (typeof arr != "object" || !arr.length) arr = [arr];
    for (let i = 0; i < arr.length; i++) {
      this.parent.innerHTML += arr[i];
    }
  }
  setup() {
    document.head.append(app.component('meta')({
      httpEquiv: "X-UA-Compatible",
      content: "IE=Edge"
    }), app.component("meta")({
      name: "viewport",
      content: "width=device-width, initial-scale=1"
    }))
  }
  setTitle(str) {
    document.title = str;
  }
  getStylesheet(url) {
    document.head.append(app.component("link")({
      rel: "stylesheet",
      href: "style.css"
    }))
  }
  get_AP_THEME(obj) {
    this.__THEMES = Object.keys(obj);
    if (this.__THEMES.includes(settings.appTheme)) return obj[this.__THEMES[this.__THEMES.indexOf(settings.appTheme)]];
    else return obj._DEFAULT;
  }
  get_RANDOM(length = 10) {
    this.count++;
    this.characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'.split("")
    this.e = "";
    for (let i = 0; i < length; i++) this.e += this.characters[Math.floor(Math.random() * this.characters.length)]
    return this.e + this.count;
  }
  clear() {
    this.parent.innerHTML = "";
    screens = []
  }
  component(str) {
    const element = document.createElement(str);
    return function(obj) {
      const keys = Object.keys(obj);
      const elem = element;
      const styles = Object.keys(document.body.style);
      for (let i = 0; i < keys.length; i++) {
        if (keys[i] == "inner") {
          if (typeof obj.inner != "object" || !obj.inner.length) obj.inner = [obj.inner];
          for (let p = 0; p < obj.inner.length; p++) {
            elem.append(obj.inner[p]);
          }
        }
        else if (keys[i] == "src") elem[keys[i]] = obj[keys[i]]
        else if (keys[i] == "theme") {
          elem.classList.add(obj[keys[i]])
        }
        else if (keys[i] == "flex" && obj[keys[i]] === true) Object.assign(elem.style, {
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        })
        else if (["content", "charset"].includes(keys[i])) elem[keys[i]] = obj[keys[i]]
        // CSS properties
        else if (!styles.includes(keys[i])) elem[keys[i]] = obj[keys[i]]
        else {
          /*  if(!__properties.themes)*/
          elem.style[keys[i]] = obj[keys[i]]
        }
      }
      if (__properties.themes) {
        if (obj.fixed && obj.fixed === true) return elem;
        if (settings.appTheme === "dark") {
          Object.assign(elem.style, {
            color: "white",
            background: "black"
          })
        }
      }
      return elem
    }
  }
  get_FUNCTION(property) {
    return {
      get_FUNCTION: this.get_FUNCTION,
      property: property,
      style: function(style) {
        Object.assign(this.property, style);
        return this.get_FUNCTION(this.property);
      },
      html: function(html) {
        if (typeof html != "object" || !html.length) html = [html]
        this.property.inner = html;
        return this.get_FUNCTION(this.property);
      },
      create: function() {
        return app.component("div")(this.property);
        //document.body.removeClild(this.element)
      },
      remove() {
        return null
      }
    }
  }
  dialog(id, data = {}) {
    return {
      id: id,
      data: data,
      show(mode = 1) {
        app.show_DIALOG(this.id, this.data, mode)
      }
    }
  }
  show_DIALOG(id, data = {}, type) {
    function get_BUTTONS() {
      let arr = []
      if (type == 0) arr = ["",
        app.component("button")({
          inner: function() {
            if (!data.option) return "Cancel";
            else return data.option[1]
          }(),
          padding: "10px 15px",
          border: "none",
          fixed: true,
          background: "#00000012",
          color: app.get_AP_THEME({
            dark: "#FFFFFF22",
            _DEFAULT: "#00000059"
          }),
          onclick: () => {
            if (data.option && data.option[3] && typeof data.option[3] == "function") data.option[3]()
            app.screen(id).remove()
          }
        }),
        app.component("button")({
          inner: function() {
            if (!data.option) return "Okay";
            else return data.option[0]
          }(),
          padding: "10px 25px",
          border: "none",
          fixed: true,
          background: "rgba(0, 256, 0, 0.2)",
          color: "rgba(0, 156, 25, 1)",
          marginLeft: "10px",
          onclick: () => {
            if (data.option && data.option[2] && typeof data.option[2] == "function") data.option[2]()
            app.screen(id).remove()
          }
        })
        ]
      else arr = ["", app.component("button")({
        inner: function() {
          if (!data.option) return "Okay";
          else return data.option[0]
        }(),
        padding: "10px 25px",
        border: "none",
        fixed: true,
        background: "rgba(0, 256, 0, 0.2)",
        color: "rgba(0, 156, 25, 1)",
        marginLeft: "10px",
        onclick: () => {
          if (data.option && data.option[1] && typeof data.option[1] == "function") data.option[1]()
          app.screen(id).remove()
        }
      })]
      arr[0] = app.component("div")({
        width: "100%",
        fixed: true,
      })
      return arr
    }
    // Setting Dailog
    document.body.append(app.screen(id, this.get_AP_THEME({
      dark: __properties.dialog.DEFAULT_screenBackground,
      _DEFAULT: "#00000059"
    })).style({
      flex: true
    }).html(app.component("div")({
      background: "white",
      minWidth: "300px",
      maxWidth: "400px",
      padding: "15px",
      margin: "0 15px",
      inner: [
      app.component("h1")({
          inner: function() {
            if (!data.title) return "Alert";
            else return data.title
          }(),
          margin: 0
        }),
    app.component("div")({
          inner: function() {
            if (!data.body) return ("Attention user!");
            else return data.body
          }(),
          margin: "5px 0",
          marginBottom: "25px",
          color: "#00000099"
        }),
    app.component("div")({
          fixed: true,
          background: this.get_AP_THEME({
            dark: "#FFFFFF12",
            _DEFAULT: "#00000012"
          }),
          padding: "10px",
          margin: "-15px",
          marginTop: "0",
          display: "flex",
          inner: get_BUTTONS()
        })]
    })).create());
  }
  __genToggleClicks(c, e, state) {
    this.__bin = document.body.querySelectorAll("." + c);
    for (let i = 0; i < this.__bin.length; i++) {
      if (this.__bin[i].id != e) {
        this.__bin_ELEMENT = [this.__bin[i].querySelector("div")]
        this.__bin_ELEMENT[1] = this.__bin_ELEMENT[0].querySelector("div")
        this.__background = this.__bin_ELEMENT[0].querySelector("span").innerHTML
        if (state) {
          this.__bin_ELEMENT[0].style.background = this.__background;
          this._ = this.__bin_ELEMENT[0].getBoundingClientRect()
          this.__bin_ELEMENT[1].style.transform = "translateX(calc(" + (this._.width - (this._.width / 1.8).toFixed(0)).toFixed(0) + "px - " + this.__bin_ELEMENT[0].style.paddingLeft + " + 1px))"
        }
        else {
          this.__bin_ELEMENT[0].style.background = "#00000029"
          this.__bin_ELEMENT[1].style.transform = "translateX(0px)"
        }
      }
    }
  }
  screen(id, background = app.get_AP_THEME({
    _DEFAULT: __properties.screen.DEFAULT_screenBackground,
    dark: "black"
  })) {
    if (!id) return console.error("ID required")
    else if (screens.includes(id)) return {
      remove() {
        // how to remove undefined from an array
        screens[screens.indexOf(id)] = undefined;
        document.body.removeChild(document.body.querySelector("#" + id))
      },
      hide() {
        document.body.querySelector("#" + id).style.display = "none";
      },
      show(mode = "block") {
        document.body.querySelector("#" + id).style.display = block;
      }
    }
    screens[screens.length] = id;
    const style = {
      background: background,
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      id: id,
      fixed: true,
    };
    return app.get_FUNCTION(style)
  }
  //
  toggle(name = "auto", width = 50, background = "#0093DD", theme = "light") {
    if (!ctgle[name]) {
      ctgle[name] = [`id-${app.get_RANDOM()}-${app.count}`, function() {
        if (__properties.saveToggles && lbase.database("__toggles").__dataList()[name] && lbase.database("__toggles").__dataList()[name][1] == true) return true
        else return false;
        }()];
      ///
      ///
      if (__properties.saveToggles) lbase.database("__toggles").add(name, ctgle[name])
    }
    const id = `id-${app.get_RANDOM()}-${app.count}`
    const style = {
      theme: ctgle[name][0],
      fixed: true,
      width: width + "px",
      inner: app.component('div')({
        height: (width / 1.8).toFixed(0) + "px",
        width: width + "px",
        fixed: true,
        background: function() {
          if (ctgle[name][1]) return background;
          else return '#00000029'
        }(),
        borderRadius: width + "px",
        padding: width * 0.1 + "px",
        inner: [app.component("div")({
          width: (width / 1.8).toFixed(0) + "px",
          fixed: true,
          height: (width / 1.8).toFixed(0) + "px",
          background: "white",
          borderRadius: "50%",
          boxShadow: "0 0 2px #00000059",
          transition: "750ms ease-in-out",
          transform: function() {
            if (ctgle[name][1]) return "translateX(" + (width - (width / 1.8).toFixed(0)).toFixed(0) + "px)";
            else return 'translateX(0)'
          }()
        }), app.component("span")({
          display: "none",
          inner: background
        })]
      }),
      id: id
    }
    return {
      style: style,
      name: name,
      create(func1 = () => {}, func2 = () => {}) {
        style.onclick = () => {
          const elements = [document.querySelector("#" + id + " div")]
          elements[1] = elements[0].querySelector("div")
          if (elements[0].style.background != "rgba(0, 0, 0, 0.16)") {
            //off state
            elements[0].style.background = "#00000029"
            elements[1].style.transform = "translateX(0px)"
            if (typeof func2 == "function") func2();
            app.__genToggleClicks(this.style.theme, this.style.id, false)
            ctgle[this.name][1] = false;
            if (__properties.saveToggles) lbase.database("__toggles").add(this.name, ctgle[this.name])
          }
          else {
            //on state
            elements[0].style.background = background
            elements[1].style.transform = "translateX(" + (width - (width / 1.8).toFixed(0)).toFixed(0) + "px)"
            if (typeof func1 == "function") func1();
            app.__genToggleClicks(this.style.theme, this.style.id, true)
            ctgle[this.name][1] = true;
            if (__properties.saveToggles) lbase.database("__toggles").add(this.name, ctgle[this.name])
          }
        }
        return app.component("div")(this.style);
      }
    }
  }
  //
  form(html) {
    return {
      create(fixed = false) {
        return app.component("div")({
          inner: html,
          fixed: fixed,
          background: app.get_AP_THEME(__properties.form.background),
          boxShadow: app.get_AP_THEME(__properties.form.boxShadow),
          maxWidth: "400px",
          maxHeight: "600px",
          margin: "15px",
          padding: "15px"
        })
      }
    }
  }
  grid() {
    return {
      create(e, scale, colors) { return app.ico_PROFIO(e, scale, colors) },
      code(e, cover = "white", colors) { return app.ico_PROFIO_CODE(e, cover, colors) },
      createWithCode(object, scale = "1") { return app.ico_PROFIO_FROM_CODE(object, scale) }
    }
  }
  ico_PROFIO_CODE(e, cover, color) {
    this.ico_count = {
      x: e,
      y: e
    }
    this.gridArray = [];
    // Returns a random color or one of the defined
    this.gridArray[0] = function() {
      if (color && typeof color === "object" && color.length) return color[Math.floor(Math.random() * color.length)];
      else return `rgba(${Math.floor(Math.random()*250)},${Math.floor(Math.random()*250)},${Math.floor(Math.random()*250)})`
    }()
    //
    if (typeof e == "object") {
      this.ico_count.x = e[0]
      this.ico_count.y = e[1]
    }
    // loops for generating codes
    for (let i = 1; i < this.ico_count.y + 1; i++) {
      // i is for rows
      // p for columns
      this.gridArray[i] = []
      for (let p = 0; p < this.ico_count.x; p++) {
        this.gridArray[i][p] = function() { return [cover, "none"][Math.floor(Math.random() * 2)] }()
      }
    }
    return this.gridArray;
  }
  ico_PROFIO_FROM_CODE(array, scale = 1) {
    let inner = "",
      size = 10 * scale;
    for (let i = 1; i < array.length; i++) {
      inner += "<div style='display:flex'>";
      for (let p = 0; p < array[i].length; p++) {
        inner += `<div style="width: ${size}px; height: ${size}px; background: ${array[i][p]}"></div>`
      }
      inner += "</div>";
    }
    return this.component("div")({ background: array[0], width: array[1].length * size + "px", height: (array.length - 1) * size + "px", fixed: true, innerHTML: inner })
  }
  ico_PROFIO(e, scale = 1, color = []) {
    this.ico_count = {
      x: e,
      y: e
    }
    if (typeof e == "object") {
      this.ico_count.x = e[0]
      this.ico_count.y = e[1]
    }
    this.ico_PROFIO_required = {
      background: function() {
        if (color && typeof color === "object" && color.length) return color[Math.floor(Math.random() * color.length)];
        else return `rgba(${Math.floor(Math.random()*250)},${Math.floor(Math.random()*250)},${Math.floor(Math.random()*250)})`
      }(),
      colors: ["none", "white"]
    }
    let inner = "",
      size = 10 * scale;
    for (let i = 0; i < this.ico_count.y; i++) {
      inner += "<div style='display:flex'>"
      for (let p = 0; p < this.ico_count.x; p++) {
        /*subElem.push(app.component("div")({
          width: "10px",
          height: "10px",
          background: function(){return (app.ico_PROFIO_required.colors[Math.floor(Math.random() * app.ico_PROFIO_required.colors.length)])
}()
        }))*/
        inner += `<div style="width: ${size}px; height: ${size}px; background: ${function(){return (app.ico_PROFIO_required.colors[Math.floor(Math.random() * app.ico_PROFIO_required.colors.length)])}()}"></div>`
      }
      inner += "</div>"
    }
    return this.component("div")({ background: this.ico_PROFIO_required.background, width: this.ico_count.x * size + "px", height: this.ico_count.y * size + "px", fixed: true, innerHTML: inner })
  }
  spinner(properties) {
    this.__spinner = {
      size: 80,
      color: "#0B7002",
      linecap: "square",
      time: 1500
    }
    Object.assign(this.__spinner, properties)
    return app.component("span")({
      innerHTML: `<svg class="${this.root.spinner}" width="${this.__spinner.size}px" height="${this.__spinner.size}px" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle style="stroke: ${this.__spinner.color};animation: ${this.root.dash} ${this.__spinner.time}ms ease-in-out infinite;" class="${this.root.path}" fill="none" stroke-width="10" stroke-linecap="${this.__spinner.linecap}" cx="50" cy="50" r="30"></circle></svg>`,
      flex: true,
      width: this.__spinner.size + "px",
      height: this.__spinner.size + "px",
      overflow: "hidden"
    })
  }
  //Pre themes
  button(obj) {
    this.__button = {
      text: "Button",
      state: "success"
    }
    Object.assign(this.__button, obj);
    return this.component("button")({
      innerHTML: this.__button.text,
      padding: "10px 15px",
      color: getStateClr(this.__button.state.toLowerCase()),
      background: getStateBg(this.__button.state.toLowerCase()),
      border: "1px solid " + getStateClr(this.__button.state.toLowerCase()),
    })
  }
  query(query) {
    return {
      element: document.body.querySelector(`${query}`),
      main(arr) {
        if (typeof arr != "object" || !arr.length) arr = [arr];
        for (let i = 0; i < arr.length; i++) {
          this.element.append(arr[i])
        }
      },
      html(arr) {
        if (typeof arr != "object" || !arr.length) arr = [arr];
        for (let i = 0; i < arr.length; i++) {
          this.element.innerHTML += arr[i]
        }
      },
      clear(){
         this.element.innerHTML = "";
      },
      setTransitionFadeOut(timeout = 250){
        this.element.style.animation = `${app.root.fadeOut} ${timeout}ms linear forwards`;
        return {
          then(callback) {
            setTimeout(callback, timeout)
          }
        }
      },
      setTransitionFadeIn(timeout = 250){
        this.element.style.animation = `${app.root.fadeIn} ${timeout}ms linear forwards`;
        return {
          then(callback) {
            setTimeout(callback, timeout)
          }
        }
      }
    }
  }
}
export const settings = new Settings();
export const app = new SeaUI();
