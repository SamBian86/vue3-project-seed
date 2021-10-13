<template>
  <div class="component-amap-address-wrapper">
    <div class="component-amap-address-input">
      <el-input :size="StyleEnum.FORM_SIZE" v-model="showText" :placeholder="placeholder" @input="inputHandle"></el-input>
    </div>
    <div class="component-amap-address-auto-complete" v-if="autoCompleteOpen && autoCompleteShow">
      <div v-for="item in autoCompleteList" class="component-amap-address-auto-item" @click="chooseAutoAddressHandle(item)">
        {{ item.district }}{{ item.address }}{{ item.name }}
      </div>
    </div>
    <div class="component-amap-address" id="aMap" ref="aMap" :style="styleText" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, unref, watch } from 'vue'
import { StyleEnum } from '/@/enums/styleEnum'
import props from './props'
export default defineComponent({
  name: 'AMapAddress',
  props: { ...props },
  setup(props, { emit }) {
    const showText = ref(props.showText)
    const lng = ref(props.lng)
    const lat = ref(props.lat)
    const placeholder = ref(props.placeholder)
    const styleText = ref(props.styleText)
    const pageType = ref(props.pageType)
    const autoCompleteOpen = ref(props.autoCompleteOpen)
    const autoCompleteShow = ref(false)
    const autoCompleteList = ref([])
    const aMap = ref(null)
    const map = ref(null)
    const marker = ref(null)
    const autoComplete = ref(null)
    const geocoder = ref(null)

    setTimeout(() => {
      initAMap()
    }, 500)

    // 初始化地图
    function initAMap() {
      map.value = new window.AMap.Map(aMap.value, {
        resizeEnable: props.resizeEnable,
        zoom: props.zoom,
        center: [lng.value, lat.value]
      })

      map.value.plugin(['AMap.ToolBar'], () => {
        map.value.addControl(new window.AMap.ToolBar())
      })

      map.value.plugin('AMap.Autocomplete', () => {
        // 实例化Autocomplete
        const autoOptions = {
          // city 限定城市，默认全国
          city: '全国'
        }
        autoComplete.value = new window.AMap.Autocomplete(autoOptions)
      })
      // 点击地图
      window.AMap.event.addListener(map.value, 'click', (response: any) => {
        const lng = response.lnglat.lng
        const lat = response.lnglat.lat
        // 移动覆盖物
        marker.value.setPosition([lng, lat])
        // 传递数据
        emit('address-change-handle', {
          address: unref(showText),
          lng,
          lat
        })
      })

      addMarker()
      // 如果没有地址，尝试用经纬度进行地址逆解析
      updateMapData()
    }

    // 添加覆盖物
    function addMarker() {
      if (!marker.value) {
        map.value.plugin('AMap.Marker', () => {
          marker.value = new window.AMap.Marker({
            icon: 'http://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
            position: [lng.value, lat.value],
            draggable: true
          })
          marker.value.setMap(map.value)
          // marker拖拽完成
          window.AMap.event.addListener(marker.value, 'dragend', (response: any) => {
            lng.value = response.lnglat.lng
            lat.value = response.lnglat.lat
            updateMapData()
          })
        })
      }
    }

    // 初始化根据经纬度进行地址逆解析
    function updateMapData() {
      if (lng.value && lat.value) {
        getAddressByLocation([lng.value, lat.value])
      } else if (!showText.value) {
        // 地址没值不处理
      } else {
        // 只有地址进行逆解析
        getLocationByAddress(unref(showText))
      }
    }

    // 经纬度转地址
    function getAddressByLocation(location) {
      if (geocoder.value === null) {
        map.value.plugin('AMap.Geocoder', () => {
          geocoder.value = new window.AMap.Geocoder()
        })
      }
      return new Promise((reslove, reject) => {
        geocoder.value.getAddress(location, (status: any, result: unknown) => {
          if (result.info === 'OK') {
            const { formattedAddress } = result.regeocode
            const lng = location[0]
            const lat = location[1]
            map.value.setCenter([lng, lat])
            marker.value.setPosition([lng, lat])

            emit('address-change-handle', {
              address: formattedAddress,
              lng,
              lat
            })
            reslove(result)
          }
          reject()
        })
      })
    }

    // 根据地址文字进行逆解析
    function getLocationByAddress(showText: any) {
      if (geocoder.value === null) {
        map.value.plugin('AMap.Geocoder', () => {
          geocoder.value = new window.AMap.Geocoder()
          address2Location(showText)
        })
      } else {
        address2Location(showText)
      }
    }

    // 根据地址文字进行逆解析实现
    function address2Location(showText: any) {
      geocoder.value.getLocation(showText, (status: any, result: { info: string; geocodes: { location: { lat: any } }[] }) => {
        if (result.info === 'OK') {
          map.value.setCenter([result.geocodes[0].location.lng, result.geocodes[0].location.lat])
          marker.value.setPosition([result.geocodes[0].location.lng, result.geocodes[0].location.lat])

          const lng = result.geocodes[0].location.lng
          const lat = result.geocodes[0].location.lat

          emit('address-change-handle', {
            address: showText,
            lng,
            lat
          })
        }
      })
    }

    // 输入文字修改
    function inputHandle(value: any) {
      emit('address-change-handle', {
        address: value,
        lng: unref(lng),
        lat: unref(lat)
      })
      if (autoCompleteOpen) {
        autoComplete.value.search(value, (status, result) => {
          console.log(status, result)
          if (status === 'complete') {
            autoCompleteShow.value = true
            autoCompleteList.value = result.tips
          }
        })
      }
    }

    // 选择autoComplete项
    function chooseAutoAddressHandle(item: any) {
      const { district, address, name, location } = item
      const { lng, lat } = location
      const _address = `${district}${address}${name}`
      autoCompleteShow.value = false
      emit('address-change-handle', {
        address: _address,
        lng,
        lat
      })
    }

    watch(
      [() => props.lng, () => props.lat, () => props.showText, () => props.pageType],
      ([newlng, newlat, newShowText, newPageType], [prevLng, prevLat, prevShowText, prevPageType]) => {
        lng.value = newlng
        lat.value = newlat
        showText.value = newShowText
        pageType.value = newPageType

        marker.value && marker.value.setPosition([lng.value, lat.value])
        marker.value && map.value.setCenter([lng.value, lat.value])
      }
    )

    return {
      StyleEnum,
      showText,
      placeholder,
      styleText,
      aMap,
      marker,
      autoCompleteOpen,
      autoCompleteShow,
      autoCompleteList,
      inputHandle,
      chooseAutoAddressHandle
    }
  }
})
</script>