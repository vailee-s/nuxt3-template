<template>
  <Starter />
   <div class="box"></div>
   <div class="w-10 h-10 bg-slate-900 dark:bg-slate-50"></div>
</template>
<style lang="scss" scoped>
.box{
  width: 100px;
  height: 100px;
  background-color: red;
}
.dark{
  .box{
  width: 100px;
  height: 100px;
  background-color: green;
}
}
</style>
