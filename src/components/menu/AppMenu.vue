<template>
  <div class="ui menu inverted">
    <div class="ui container">
      <a href="/" class="item">Inicio</a>
      <a href="#/vendas" class="item">Vendas</a>
      <a href="#/itens" class="item">Produtos</a>
      <a href="#/users" class="item">Usuários</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app-menu'
}
</script>

<style>
.menu {
  border-radius: 0 !important;
  box-shadow: 0px 0px 9px rgba(0,0,0, 0.3) !important;
}
.menu a.item {
  line-height: 2em !important;
  font-size:14px;
}
.menu a.item::before {
  display: none;
}
</style>
