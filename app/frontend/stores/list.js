import Vue from 'vue/dist/vue.esm';
import Vuex from 'vuex';
import Rails from '@rails/ujs'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    lists: [],
    events: []
  },
  getters: {

  },
  mutations: {
    UPDATE_LIST(state,list){
      state.lists = list.res
    },
    UPDATE_LIST_NAME(state,list){
      let list_index = state.lists.findIndex(item => item.id == list.id)
      state.lists.splice(list_index,1,list)
    },
    CREATE_LIST(state,list){
      state.lists.push(list)
    },
    SET_EVENTS(state,data){
      // console.log(data.events)
      this.state.events = data.events
    },
    CREATE_EVENT(state,event){
      this.state.events.splice(0,0,event)
    },
    UPDATE_EVENT(state,event){
      // let list_index = state.lists.findIndex(list => list.id == event.list_id)
      let event_index = state.events.findIndex(item => item.id == event.id)
      state.events.splice(event_index,1,event)
    },
    DELETE_EVENT(state,event_id){
      let event_index = state.events.findIndex(item => item.id == event_id)
      state.events.splice(event_index,1)
    }
  },
actions: {
  loadLists({commit},list_id){
    Rails.ajax({
      // /lists/id.json
      url: '/lists.json',
      type: 'GET',
      dataType: 'json',
      success: res => {
        // console.log(res)
        commit('UPDATE_LIST',{res,list_id})
        // console.log(res)
      },
      error: err => {
        console.log(err)
      }
    })
  },
  newList({commit}){
    let data = new FormData();
    data.append("list[name]", '尚未決定名稱...');
    // lists
    Rails.ajax({
      url: '/lists',
      type: 'POST',
      data,
      dataType: 'json',
      success: res =>{
        commit('CREATE_LIST',res)
        console.log('success')
      },
      error: err => {
        console.log(err)
      }
    })
  },
  createEvent({commit},event){
      console.log(event)
      let data = new FormData()
      data.append("event[name]", event.name)
      data.append("event[description]", event.description)
      data.append("event[list_id]", event.list_id)
      // for (var pair of data) {
      //       console.log(pair[0]+ ', ' + pair[1]);
      //   }
      Rails.ajax({
        url:'/events',
        type: 'POST',
        data,
        dataType:'json',
        success: res => {

          commit('CREATE_EVENT',res)
          // console.log(res)
        },
        error: err => {
          console.log(err)
        }
      })
  },
  loadEvents({commit},list_id){
    console.log(list_id)
    Rails.ajax({
      // /lists/id.json
      url: `/lists/${list_id}.json`,
      type: 'GET',
      dataType: 'json',
      success: res => {
        commit('SET_EVENTS',res)
        // console.log(res)
      },
      error: err => {
        console.log(err)
      }
    })
  },
  updateEvent({commit},{name,description,id}){
    // for (var pair of data) {
    //     console.log(pair[0]+ ', ' + pair[1]);
    // }
    let data = new FormData()
    data.append("event[name]", name)
    data.append("event[description]", description)
    data.append("event[id]", id)

    Rails.ajax({
      url: `/events/${id}`,
      type: 'PUT',
      data,
      dataType: 'json',
      success: res => {
        commit('UPDATE_EVENT',res)
        console.log(res)
      },
      error: err => {
        console.log(err)
      }
    })
  },
  deleteEvent({commit},event_id){
    Rails.ajax({
      url: `/events/${event_id}`,
      type: 'delete',
      dataType: 'json',
      success: res => {
        commit('DELETE_EVENT',event_id)
      },
      error: err => {
        console.log(err)
      }
    })
  },
  updateList({commit},{name,list_id}){
    let data = new FormData()
    data.append('list[name]',name)
    console.log(list_id)
    Rails.ajax({
      url: `/lists/${list_id}`,
      type: 'PUT',
      dataType: 'json',
      data,
      success: res => {
        commit('UPDATE_LIST_NAME',res)
        console.log(res)
      },
      error: err => {
        console.log(err)
      }
    })

  }
}
})