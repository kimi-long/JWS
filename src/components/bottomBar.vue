<template>
    <div class="am-tabs-tab-bar-wrap" style="position:fixed;left:0;bottom:0;width:100%;z-index:999;">
        <div class="am-tab-bar-bar bottom">
            <div class="am-tab-bar-tab" @click="toIndex" :class="index == 1?'current':''">
                <div class="am-tab-bar-tab-icon">
                    <div class="IndexNavBar__BadgeWrapper-zp8p8u-1 fXTpFr"><i
                        class="icon am-icon am-icon-homepage am-icon-s"></i></div>
                </div>
                <p class="am-tab-bar-tab-title">工作台</p>
            </div>
            <div class="am-tab-bar-tab" @click="tomy" :class="index == 2?'current':''">
                <div class="am-tab-bar-tab-icon">
                    <div class="IndexNavBar__BadgeWrapper-zp8p8u-1 fXTpFr"><i
                        class="icon am-icon am-icon-me am-icon-s"></i></div>
                </div>
                <p class="am-tab-bar-tab-title">我的</p>
            </div>
        </div>
    </div>
</template>

<script>
    import { getLocal,getStore,setStore } from '@/config/mUtils';

	export default {
		components: {},
		data() {
			return {
            }
		},
        props:['index'],
		created() {
		},

		destroyed() {

		},

		mounted() {
            jQuery('.am-tabs-default-bar-tab').click(function() { TabSelect(".am-tabs-default-bar-tab", "div.lists", "am-tabs-default-bar-tab-active", jQuery(this)) });
            jQuery('.am-tabs-default-bar-tab').eq(0).trigger("click");
            function TabSelect(tab,con,addClass,obj) {
                var jQuery_self = obj;
                var jQuery_nav = jQuery(tab);

                jQuery_nav.removeClass(addClass),
                    jQuery_self.addClass(addClass);

                var jQuery_index = jQuery_nav.index(jQuery_self);
                var jQuery_con = jQuery(con);
                jQuery_con.hide(),
                    jQuery_con.eq(jQuery_index).show();
            };
		},
		computed: {},
		methods: {
            toIndex(){
                this.$router.push({path:'/',query:{storesid:getStore('storesid'),openid:getStore('openid')}})
            },
            tocalendar(){
                this.$router.push({path:'/calendar',query:{storesid:getStore('storesid'),openid:getStore('openid')}})
            },
            toyuyue(){
                this.$router.push({path:'/yuyue',query:{storesid:getStore('storesid'),openid:getStore('openid')}})
            },
            tomy(){
                this.$router.push({path:'/my',query:{storesid:getStore('storesid'),openid:getStore('openid')}})
            },

        }
	}

</script>

<style scoped>
  .am-tab-bar-bar {
    position: relative;
    box-sizing: border-box;
    height: 50px;
    border-top: 1px solid #ddd;
    width: 100%;
    display: flex;
    transition-duration: .2s;
    transition-property: height bottom;
    z-index: 100;
    justify-content: space-around;
    align-items: center;
    bottom: 0;
  }
  .am-tab-bar-bar .am-tab-bar-tab {
    flex: 1 1;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: center;
    width: 100%;color:rgba(169,169,169,1)
  }
  .am-tab-bar-bar .am-tab-bar-tab.current{
    color:#ED7979
  }

  .am-tab-bar-bar .am-tab-bar-tab-icon {
    display: flex;
    justify-content: center;
  }
</style>
