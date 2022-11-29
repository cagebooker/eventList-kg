// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

require("@rails/ujs").start()
require("turbolinks").start()
require("@rails/activestorage").start()
require("channels")


// Uncomment to copy all static images under ../images to the output folder and reference
// them with the image_pack_tag helper in views (e.g <%= image_pack_tag 'rails.png' %>)
// or the `imagePath` JavaScript helper below.
//
// const images = require.context('../images', true)
// const imagePath = (name) => images(name, true)
import "../styles"

// vue.js
import Vue from 'vue/dist/vue.esm';
import List from 'components/list.vue'
import Rails from '@rails/ujs'
import store from 'stores/list.js'
import Event from 'components/event.vue'

document.addEventListener("turbolinks:load", function(event){
  let el = document.querySelector('#board');
  if(document.querySelector('#list-id')){
    var list_id = document.querySelector('#list-id').dataset.listId
  }
  if(document.querySelector('#list-events')){
    var evt = document.querySelector('#list-events').dataset.list
  }
  // console.log(list_id)
  var url = location.href;
  // console.log(evt);
  if(el){
    new Vue({
      el,
      store,
      data:{
        eventEditing: false,
        eventName: '',
        eventDescription: '',
      },
      computed:{
        lists(){
          return this.$store.state.lists
        },
        list(){
          return this.$store.state.lists.find( list => list.id == list_id)
        },
        // listName(){
        //   let list = this.$store.state.lists.find( list => list.id == list_id).name
        //   console.log(list.name)
        //   return list
        // },
        events(){
          return this.$store.state.events
        },
      },
      components:{List, Event},
      methods:{
        changeListName(evt){
          // console.log(this.list.id)
          this.$store.dispatch('updateList',{name: evt.target.value, list_id: this.list.id})
        },
        newList(evt){
          evt.preventDefault()
          // console.log("ready to new a list")
          this.$store.dispatch('newList')
        },
        createEvent(evt){
          evt.preventDefault()
          // let data = new FormData()
          // data.append("event[name]", this.eventName)
          // data.append("event[description]", this.eventDescription)
          this.$store.dispatch('createEvent',{name: this.eventName,
            description: this.eventDescription, list_id: list_id})
          this.eventName = ''
          this.eventDescription = ''
          this.eventEditing = false
        }
      },
      beforeMount(){
        this.$store.dispatch('loadLists',list_id)
        this.$store.dispatch('loadEvents',list_id)
      }
    })
  };
})

