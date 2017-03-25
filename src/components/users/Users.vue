<template>
    <div class="ui container">
        <app-table classnames="ui table padded selectable full-width"
        :fields="['nome:Nome', 'sobrenome:Sobrenome', 'username:Login']"
        endpoint="http://localhost:8765/users"
        maxheight="400"
        dataref="attributes"
        >
        <tr>
            <th colspan="2">
                <button class="ui left floated primary labeled icon button"><i class="icon add user"></i> Adicionar</button>
                <button class="ui left labeled icon button black"><i class="icon remove user"></i> Remover</button>
            </th>
            <th class="right aligned">
                <div class="ui right">
                    <div class="ui small input icon right">
                    <i class="icon inverted circular search link"></i>
                    <input type="text" placeholder="Nome, Código">
                </div>
                </div>
            </th>
        </tr>
        </app-table>
    </div>
</template>

<script>
import AppTable from '@/components/tables/AppTable'
export default {
  components: {AppTable}
}
</script>

<style>
</style>
