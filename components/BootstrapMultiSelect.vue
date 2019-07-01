<template>
  <select :multiple="pickerOptions.multiple === true" class="selectpicker form-control" :disabled="pickerOptions.disabled" @change="onChange">
    <option v-if="hideNoneSelectedText === false" :value="null" :disabled="false" :selected="value == null"></option>
    <option v-for="(val, ind) in items" v-bind="val" :key="ind" :selected="isOptionSelected(val.value)">
      {{val.label}}
    </option>
  </select>
</template>

<script>
  import {each, isArray, map, isString} from 'lodash'
  export default {
    name: 'bootstrap-select',
    props: {
      value: {
        required: true,
        default: ''
      },
      items: {
        type: Array,
        required: false,
        default: []
      },
      pickerOptions: {
        type: Object,
        required: false,
        default: () => {}
      },
      hideNoneSelectedText: {
        type: Boolean,
        required: false,
        default: false
      }
    },
    computed: {
      valueToIndexMap () {
        let idMap = {}
        each(this.items, (item, ind) => {
          idMap[item.value] = ind
        })
        return idMap
      }
    },
    updated () {
      this.$nextTick(() => {
        $(this.$el).selectpicker('refresh')
        this.onChange()
      })
    },
    mounted () {
      this.$nextTick(() => {
        $(this.$el).selectpicker(this.pickerOptions)
        this.onChange()
      })
    },
    methods: {
      isOptionSelected (val) {
        if (!this.value) {
          return false
        }
        if (isString(this.value)) {
          if (this.value.indexOf(',') > -1) {
            let valArr = this.value.split(',')
            if (valArr.indexOf(`${val}`) > -1) {
              return true
            }
          } else {
            return val === this.value
          }
        } else if (isArray(this.value)) {
          if (this.value.indexOf(`${val}`) > -1) {
            return true
          }
        }
        return false
      },
      onChange (evt) {
        const option = $(this.$el).val()
        let items = null
        if (isArray(option)) {
          items = map(option, (value) => {
            return this.items[this.valueToIndexMap[value]]
          })
        } else {
          items = this.items[this.valueToIndexMap[option]]
        }
        this.$emit('input', option, items)
      }
    }
  }
</script>
