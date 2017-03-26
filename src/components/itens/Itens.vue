<template>
    <div class="ui itens container">
        <app-table classnames="ui table padded full-width"
        :fields="['nome:Nome', 'ncm:NCM', 'qnt:Quantidade']"
        endpoint="http://localhost:8765/itens"
        maxheight="300"
        :getitem="editar"
        dataref="attributes"
        :filter="filtro"
        :loadedcallback="visualizar"
        :dados="dados"
        >
        <tr>
            <th colspan="2">
                <button class="ui left floated primary labeled icon button"><i class="icon add user"></i> Adicionar</button>
                <button class="ui left labeled icon button black"><i class="icon remove user"></i> Remover</button>
            </th>
            <th class="right aligned">
                <div class="ui right">
                    <div class="ui small input icon right">
                    <i @click="test" class="icon inverted circular search link"></i>
                    <input v-model="filtro"  type="text" placeholder="Nome, Código" @keyup.enter="pesquisar">
                </div>
                </div>
            </th>
        </tr>
        </app-table>
    </div>
</template>

<script>
import AddItemForm from './AddItemForm'
import AppTable from '@/components/tables/AppTable'
export default {
  name: 'Itens',
  components: {AddItemForm, AppTable},
  data () {
    return {
      filtro: 0,
      dados: []
    }
  },
  methods: {
    test () {
      this.$emit('onFilter', 0)
    },
    filtrar () {
    },
    visualizar (data) {
      console.log(data)
      return data.body.data
    },
    editar (item) {
      console.log(AppTable)
      console.log(item)
    },
    // Quando ENTER for pressionado no campo de busca chama a Api
    // e passa para o componente da tabela
    pesquisar (e) {
      this.$http.get('http://localhost:8765/itens?p=' + e.target.value)
        .then((response) => {
          this.dados = response.data.dados
        })
    }
  },
  created () {
    this.$emit('filter', dados => {
      console.log(dados)
    })
  }
}
</script>

<style>

</style>
