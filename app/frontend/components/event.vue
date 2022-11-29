<template>
    <div class="event">
      <span class="evt-name">
        {{evt.name}}
      </span>
      <div class="divider"></div>
      <div class="event-time">{{ evt.created_at | trim }}</div>
      <div class="event-description">{{ evt.description | trim(80) }}</div>
      <i class="fa-solid fa-caret-right evt-icon" @click="updateEventNew"></i>

      <div v-if="editing" class="event-update-field">
        <div class="icon-trash" @click="deleteEvent">
          <i class="fa-solid fa-trash"></i>
        </div>
        <div class="icon" @click="editing = false">
          <i class="fa-solid fa-xmark"></i>
        </div>
        <div class="field">
            <label class="label" style="width: 60px">名稱</label>
            <input type="text" class="input-fix" v-model="name">
        </div>
        <div class="field">
            <label class="label">描述</label>
            <textarea class="textarea-fix" v-model="description"></textarea>
        </div>
        <div class="field">
            <button class="button is-small" @click="updateEvent">更新</button>
        </div>
      </div>
    </div>
</template>

<script>
export default{
    name: 'Event',
    props: ['evt'],
    data(){
        return{
            editing: false,
            name: this.evt.name,
            description: this.evt.description
        }
    },
    filters: {
        trim(value,num = 10){
            if (value==null) {
               return value
            }
            if(value.length > 5 ){
                return value.slice(0,num)
            }
            return value
        }
    },
    methods:{
        updateEventNew(){
            this.editing = true
        },
        updateEvent(){
            // data.append("event[list_id]",this.evt.list_id)
            this.$store.dispatch('updateEvent',{name: this.name, description: this.description, id: this.evt.id})
        },
        deleteEvent(){
            let yes = confirm('你確定要刪除此事件嗎？');

            if (yes) {
                this.$store.dispatch('deleteEvent', this.evt.id)
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.event{
    height: 100px;
    margin-bottom: 30px;
    width: 360px;
    position: relative;
    border: 1px solid #EEEEEE;
    left: 220px;
    padding: 8px 12px;
    transition: 0.3s;
    /* overflow-y: hidden;
    overflow-x: visible; */
    /* overflow: hidden; */
    border-radius: 5px;
/*     border-top: 3px solid rgba(0,0,0,0.6);
    border-left: 3px solid rgba(0,0,0,0.6); */
    animation-name: showup;
    animation-duration: 1.2s;
    animation-timing-function: ease-in-out;
    &:hover{
        box-shadow: 7px 8px 10px 2px rgba(181,181,181,0.69);
    }
    .event-time{
        position: absolute;
        left: -170px;
        top: 16px;
    }
}
div.event::before{
    content: '';
    width: 30px;
    /* height: 20px; */
    border: 3px solid #EBEBEA;
    border-radius: 5px;
    position: absolute;
    left: -50px;
    top: 25px;
}
div.event::after{
    content: '';
    width: 24px;
    height: 24px;
    background-color: #29A745;
    border: 5px solid #fff;
    border-radius: 50%;
    position: absolute;
    left: -70px;
    top: 15px;
}
@keyframes showup{
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

.evt-name{

}
.divider{
    border-bottom: 1px solid #EBEBEA;
    margin: 3px 0px;
}
.evt-icon{
    position: absolute;
    right: 10px;
    bottom: 10px;
    cursor: pointer;
    &:hover{
        bottom: 13px;
    }
}
.event-update-field{
    position: fixed;
    width: 400px;
    height: 80vh;
    left: 900px;
    background-color: #fff;
    top: 10%;
    z-index: 51;
    transform-style: preserve-3d;
    border: 1px solid #EBEBEA;
    border-radius: 3px;
    transition: 0.3s;
    &:hover{

    }
    .icon{
        cursor: pointer;
        box-sizing: border-box;
        width: 25px;
        height: 25px;
        padding: 5px;
        transform: translate(10px, 3px);
        position: absolute;
        right: 20px;
        top: 10px;
        z-index: 15;
        &:hover{
            border: 1px solid #EBEBEA;
            border-radius: 50%;
        }
    }
}
.input-fix{
    outline: none;
    box-shadow: none;
    border: none;
    border-bottom: 1px solid #EBEBEA;
    display: block;
    font-size: 16px;
}
.field{
    position: relative;
    top: 10px;
    left: 10px;
    z-index: 10;
}
.textarea-fix{
    border: 1px solid #EBEBEA;
    padding: 4px 8px;
    width: 95%;
    height: 200px;
    resize: none;
}
.button{
    position: relative;
    width: 95%;
    right: 0px;
    &:focus{
        box-shadow: none;
    }
}
.fa-trash:hover{
    color: red;
}
.label{
    display: inline-block;
}
.icon-trash{
    position: absolute;
    right: 40px;
    top: 14px;
    cursor: pointer;
    z-index: 15;
}
</style>
