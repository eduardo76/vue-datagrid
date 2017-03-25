<template>
    <div class="table-fixed">
      <table :class="classnames+' attached head-fixed'">
        <thead v-if="Array.isArray(fields) && thead === undefined">
            <tr ref="titleshead"><th v-for="field in fields">{{field | title}}</th></tr>
        </thead>
      </table>
      <div class="scrollbody attached" ref="table">
          <table :class="classnames + 'attached'">
        <tbody ref="tbody">
            <tr v-on:dblclick="getItem(item)" v-for="item in data" v-if="dataref != undefined">
                <td v-for="title in fields">{{item[dataref][index(title)]}}</td>
            </tr>
            <tr v-on:dblclick="getItem(item)" v-for="item in data" v-if="dataref === undefined">
                <td v-for="title in fields">{{item[index(title)]}}</td>
            </tr>
            <tr v-if="data.length === 0">
                <td :colspan="fields.length">
                    <div class="spinner">
                        <div class="bounce1"></div>
                        <div class="bounce2"></div>
                        <div class="bounce3"></div>
                    </div>
                </td>
            </tr>
        </tbody>
      </table>
      </div>
      <table :class="classnames + 'attached tfoot'">
        <tfoot ref="tfoot">
            <slot></slot>
        </tfoot>
      </table>
    </div>
</template>
<script>
import AddItemForm from '@/components/itens/AddItemForm'

var matchPage = function (page) {
  if (page !== null && page !== undefined) {
    return page.match(/(\d+)$/)[0]
  } else {
    return undefined
  }
}

var options = function (mediatype = true, get = true) {
  if (mediatype === true) {
    if (get) {
      return {headers: {'Accept': 'application/vnd.api+json'}}
    } else {
      return {headers: {'Content-Type': 'application/vnd.api+json', 'Accept': 'application/vnd.api+json'}}
    }
  }
}
export default {
  name: 'app-table',
  components: {AddItemForm},
  props: ['classnames', 'fields', 'itens', 'dataref', 'endpoint', 'thead', 'jsonmedia', 'maxheight', 'maxperpage', 'loadtext', 'loadedcallback', 'getitem', 'filter'],
  data () {
    return {
      data: [],
      rowsData: [],
      scrollY: 0,
      tableSeted: false,
      page: 0,
      nextPage: undefined,
      prevPage: undefined,
      founded: 0,
      pages: 0
    }
  },
  methods: {
    test () {
      console.log('oi eu filtrei!')
    },
    loadTable () {
      if (this.data.length === 0 && this.endpoint !== undefined) {
        this.$http.get(this.endpoint, options(this.jsonmedia, true)).then(resp => {
          if (this.loadedcallback !== undefined) {
            this.data = this.loadedcallback(resp)
          } else {
            this.data = resp.body.data
          }
          this.setMetaData(resp.data)
        }, resp => {
          console.log(resp)
        })
      }
    },
    index (title) {
      return title.split(':')[0]
    },
    getItem (item) {
      if (this.getitem !== undefined) {
        this.getitem(item[this.dataref])
      }
    },
    sayHello () {
      console.log(this.data)
    },
    setTableHeight () {
      this.$refs.table.style.maxHeight = this.maxheight + 'px'
      this.$refs.table.style.height = '100%'
    },
    setThead () {
      var fullWidth = this.$refs.tbody.offsetWidth
      var tds = this.$refs.tbody.firstElementChild.childNodes
      var titles = this.$refs.titleshead.childNodes
      for (var i = 0; i < this.fields.length; i++) {
        var width = (tds[i].offsetWidth / fullWidth) * 100
        width -= 0.4
        titles[i].style.display = 'inline-block'
        titles[i].style.width = width + '%'
      }
    },
    setMetaData (data) {
      this.page = matchPage(data.links.self)
      this.nextPage = matchPage(data.links.next)
      this.prevPage = matchPage(data.links.prev)
      this.founded = data.meta.record_count
      this.pages = data.meta.page_count
    },
    reloadTable () {
      this.setThead()
      this.tableSeted = true
      this.setloadMore()
    },
    loadMore () {
    },
    setloadMore () {
      if (this.maxperpage !== undefined && this.founded > this.maxperpage) {
        var trLine = document.createElement('tr')
        var tdCols = document.createElement('td')
        tdCols.colSpan = this.fields.length
        tdCols.className = 'load-more'
        tdCols.textContent = this.loadtext || 'Carregar mais....'
        trLine.appendChild(tdCols)
        this.$refs.tbody.appendChild(trLine)
      }
    }
  },
  filters: {
    title (data) {
      var title = data.split(':')
      return title[1] || title[0]
    }
  },
  mounted () {
    this.setTableHeight()
    this.loadTable()
  },
  updated () {
    this.reloadTable()
    this.$on('filter', this.data)
  },
  created () {
  },
  watch: {
    filter: function (newFilter) {
      console.log(newFilter)
    }
  }
}
</script>

<style>
.spinner {
  margin: 20px auto;
  width: 70px;
  text-align: center;
}

.spinner > div {
  width: 18px;
  height: 18px;
  background-color: #333;

  border-radius: 100%;
  display: inline-block;
  -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
  animation: sk-bouncedelay 1.4s infinite ease-in-out both;
}

.spinner .bounce1 {
  -webkit-animation-delay: -0.32s;
  animation-delay: -0.32s;
}

.spinner .bounce2 {
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
}

@-webkit-keyframes sk-bouncedelay {
  0%, 80%, 100% { -webkit-transform: scale(0) }
  40% { -webkit-transform: scale(1.0) }
}

@keyframes sk-bouncedelay {
  0%, 80%, 100% { 
    -webkit-transform: scale(0);
    transform: scale(0);
  } 40% { 
    -webkit-transform: scale(1.0);
    transform: scale(1.0);
  }
}

.table-fixed {
  max-height: 400px;
  position:relative;
}

.scrollbody {
  overflow-y:auto;
  height: 100%;
}
.scrollbody table {
  border-radius: 0 !important;
}
.scrollbody td {
  cursor:pointer;
}
.scrollbody tr:hover{
  background-color: #f2f2f2 !important;
  -webkit-box-shadow:inset 0 -3px 5px 0 rgba(0,0,0,0.03);
  box-shadow:inset 0 -5px 5px 0 rgba(0,0,0,0.05);
}
.head-fixed{
  margin:0 !important;
  width: 100% !important;
  max-width:100%;
}
.head-fixed thead {
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.06), 0 2px 0 rgba(0, 0, 0, 0.075), 0 3px 0 rgba(0, 0, 0, 0.05), 0 4px 0 rgba(0, 0, 0, 0.01) !important;
}
.head-fixed thead tr th{
  border: none;  
  color: rgba(0, 0, 0, 0.54) !important;
  line-height:1.7em;
}
.tfoot {
  margin-top:0 !important;
  border-top:none !important;
  border-radius: 0 !important;
}
.load-more {
  text-align: center !important;
  color: rgba(6, 87, 148, 0.63);
  font-size:11px;
  
}
.load-more:hover,
.load-more:focus {
  color: rgb(6, 87, 148);
}
</style>

