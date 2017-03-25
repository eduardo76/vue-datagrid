<template>
    <div>
        <form v-on:submit.prevent="salvar" autocomplete="off">
            <label for="nome">Nome</label>
            <input type="text" v-model="itemModel.nome" autofocus id="nome">
            <label for="codigo">Código</label>
            <input class="ui input" type="text" v-model="itemModel.codigo" id="codigo">
            <label for="ncm">NCM</label>
            <input type="text" v-model="itemModel.ncm" id="ncm">
            <button type="submit" class="ui primary button">Enviar</button>
        </form>
        <table class="ui celled table">
  <thead>
    <tr><th>CÓDIGO</th>
    <th>NOME</th>
    <th>NCM</th>
  </tr></thead>
  <tbody>
    <tr v-for="item in itens">
      <td>
        <div class="ui ribbon label">{{item.attributes.codigo}}</div>
      </td>
      <td>{{item.attributes.nome}}</td>
      <td>{{item.attributes.ncm}}</td>
    </tr>
  </tbody>
</table>
    </div>
</template>

<script>
var options = {}
options.headers = {'Content-Type': 'application/vnd.api+json', 'Accept': 'application/vnd.api+json'}
export default {
  name: 'add-item-form',
  data () {
    return {
      itemModel: {
        nome: '',
        ncm: '',
        codigo: ''
      },
      itens: []
    }
  },
  methods: {
    salvar () {
      this.$http.post('itens/add', this.itemModel, options).then(resp => {
        console.log(resp)
        this.carregarTabela()
      }, resp => {
        console.log(resp)
      })
      return false
    },
    carregarTabela () {
      this.$http.get('itens', options).then(resp => {
        this.itens = resp.body.data
      }, resp => {
        console.log(resp)
      })
    }
  },
  mounted () {
    this.carregarTabela()
  }
}
</script>
