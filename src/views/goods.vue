<template>
        <div>
          <nav-header></nav-header>
          <nav-bread>
            <span>Goods</span>
          </nav-bread>
          <div class="accessory-result-page accessory-page">
            <div class="container">
              <div class="filter-nav">
                <span class="sortby">Sort by:</span>
                <a href="javascript:void(0)" class="default cur">Default</a>
                <a href="javascript:void(0)" class="price" @click="sortGoods()">Price
                  <svg class="icon icon-arrow-short">
                    <use xlink:href="#icon-arrow-short"></use></svg></a>
                <a href="javascript:void(0)" class="filterby stopPop" @click="showFilterPop">Filter by</a>
              </div>
            </div>
          </div>
          <div class="accessory-result">
            <!-- filter -->
            <div class="filter stopPop" id="filter" v-bind:class="{'filterby-show':filterBy}">
              <dl class="filter-price">
                <dt>Price:</dt>
                <dd><a href="javascript:void(0)" v-bind:class="{'cur':priceChecked=='all'}" @click="setPriceFilter('all')" >All</a></dd>
                <dd v-for="(item,index) in priceFilter">
                  <a href="javascript:void(0)" @click="setPriceFilter(index)"  v-bind:class="{'cur':priceChecked==index}">{{item.startPrice}} - {{item.endPrice}}</a>
                </dd>
              </dl>
            </div>
          </div>

          <!-- search result accessories list -->
          <div class="accessory-list col-4">
              <ul>
                <li v-for="goods in GoodsList">
                  <div class="pic">
                    <a href="#"><img v-lazy="'static/'+goods.productImage" alt="goods.productId"></a>
                  </div>
                  <div class="main">
                    <div class="name">{{goods.productName}}</div>
                    <div class="price">{{goods.salePrice}}</div>
                    <div class="btn-area">
                      <a href="javascript:0;" class="btn btn--m" >加入购物车</a>
                    </div>
                  </div>
                </li>
              </ul>
              <div class="view-more-normal"
                   v-infinite-scroll="loadMore"
                   infinite-scroll-disabled="busy"
                   infinite-scroll-distance="20">
                <img src="./../assets/loading-spinning-bubbles.svg" v-show="loading">
              </div>
            </div>
          <div class="md-overlay" v-show="overLayFlag" @click.stop="closePop"></div>
          <nav-footer></nav-footer>
        </div>
</template>

<script>
  import  './../assets/css/base.css'
  import  './../assets/css/product.css'
  import NavHeader from './../components/NavHeader'
  import NavFooter from './../components/NavFooter'
  import NavBread from './../components/NavBread'
  import axios from 'axios'

  export default {
    data() {
      return {
        GoodsList: [],
        FilterGoods:[],
        sortFlag:true,
        page:1,
        pageSize:4,
        busy:true,
        loading:false,
        priceFilter: [
          {
            startPrice: '0.00',
            endPrice: '500.00'
          },
          {
            startPrice: '500.00',
            endPrice: '1000.00'
          },
          {
            startPrice: '1000.00',
            endPrice: '8000.00'
          },
          {
            startPrice: '8000.00',
            endPrice: '100000.00'
          }
        ],
        priceChecked:"all",
        filterBy:false,
        overLayFlag:false,
        mdshowFilter:false,
      }
    },
    mounted() {
      this.getGoodsList();
    },
    components: {
      NavHeader,
      NavFooter,
      NavBread,
    },
    methods: {
      getGoodsList(flag) {

          let param= {
              page:this.page,
              pageSize:this.pageSize,
              sort:this.sortFlag?1:-1,
              priceLevel:this.priceChecked,
          };
          this.loading = true;
          axios.get('/goods',{
            params:param
          }).then((response)=>{
                var res = response.data;
                 if(res.status == "0") {
                   if(flag){
                     this.GoodsList = this.GoodsList.concat(res.result.list);
                     if(res.result.count==0){
                       this.busy = true;
                     }else{
                       this.busy = false;

                     }
                   }else{
                     this.GoodsList = res.result.list;
                     this.busy = false;
                   }
                 }else{
                   this.GoodsList = [];
                 }
          });
      },
      setPriceFilter(index){
          this.priceChecked = index;
          this.page = 1;
          this.getGoodsList();
          this.closePop();

      },
      sortGoods(){
          this.sortFlag = !this.sortFlag;
          this.page = 1,
          this.getGoodsList();
      },
      loadMore(){
        this.busy = true;
        setTimeout(() => {
          this.page++;
          this.getGoodsList(true);
        }, 500);
      },
      showFilterPop(){
        this.filterBy = true;
        this.overLayFlag=true;
      },
      closePop(){
        this.filterBy=false;
        this.overLayFlag=false;
      },
      showLoginBoxPip(){
        this.md_showFilter=true;
      }
    }
  }
</script>

