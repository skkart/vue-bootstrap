<template>
  <div class="app-bootstrap-datepicker field form-group">
    <div class="field-wrap input-group">
      <div class="input-select-wrapper">
        <input type="text" class="form-control input-date">
      </div>
      <span class="input-group-btn">
        <button type="button" style="padding: 3px 5px;" class="btn btn-apply" @click="toogleDataPicker">
          <i class="fa fa-calendar"></i>
        </button>
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'app-bootstrap-datepicker',
    props: {
      pickerOptions: {
        type: Object,
        required: false,
        default () {
          return {
            format: 'dd/mm/yyyy',
            todayHighlight: true
          }
        }
      }
    },
    data () {
      return {
        dataPicker: null,
        isShown: false
      }
    },
    mounted () {
      this.$nextTick(() => {
        this.dataPicker = $(this.$el).find('input').datepicker(this.pickerOptions)
        this.dataPicker
          .on('changeDate', this.changeDate)
          .on('show', () => {
            this.isShown = true
          })
          .on('hide', () => {
            this.isShown = false
          })
          .datepicker('setDate', this.pickerOptions.endDate)
      })
    },
    methods: {
      changeDate (val) {
        this.$emit('input', val.format())
      },
      toogleDataPicker () {
        if (!this.isShown) {
          this.dataPicker.datepicker('show')
        }
      }
    },
    beforeDestroy () {
      this.dataPicker && this.dataPicker.datepicker('destroy')
    }
  }
</script>
