<template>
    <div class="list-item">
        <i class="fa-solid fa-share mr-1"></i>
        <a href="">
          {{list.name}}
        </a>


    </div>
</template>

<script>
export default{
    name: 'List',
    props: ['list']
}
</script>
<style scoped>
</style>