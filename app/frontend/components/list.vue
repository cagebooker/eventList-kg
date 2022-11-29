<template>
    <div class="list-item ">
        <i class="fa-solid fa-share mr-1"></i>
        <a :href="list_url" class="hover-transparent" @click="loadEvents">
          {{list.name}}
        </a>
    </div>
</template>

<script>
import Rails from '@rails/ujs'
export default{
    name: 'List',
    props: ['list'],
    data() {
        return {
            list_url:  `/lists/${this.list.id}`
        }
    },
    methods:{
        loadEvents(evt){
            this.$store.dispatch('loadEvents',this.list.id)
        }
    }
}
</script>
<style lang="scss" scoped>
$list-bg-color: #bdc3c7;
.hover-transparent{
    &:hover{
        background-color: transparent;
    }
}
.list-item{
    padding: 4px 14px;
    cursor: pointer;
    font-size: 14px;
    &:hover{
        background-color: $list-bg-color;
    }
    a{
        display: inline-block;
        width: 150px;
        color: #666666;
    }
}
.list-name-input{
    width: 300px;
    border: none;
    box-shadow: none;
    &:focus{
        /* outline: none; */
    }
}
</style>