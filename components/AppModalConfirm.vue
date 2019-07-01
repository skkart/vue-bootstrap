<template>
  <div tabindex="-1">
    <div role="dialog" style="display: block;" class="modal fade in show" @keydown="handleKeyDown">
      <div class="modal-dialog app-modal" :class="modelClass">

        <!-- Modal content-->
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">
              <slot name="header">Modal Header</slot>
            </h4>
            <button type="button" class="close" @click="$emit('cancel')">×</button>
          </div>
          <div class="modal-body">
            <slot name="body">
              <p>Some text in the modal.</p>
            </slot>
          </div>
          <div class="modal-footer">
            <slot name="footer">
              <button type="button" class="btn small-btn btn-cancel-aryaka" @click="$emit('cancel')">Cancel</button>
              <button type="button" class="btn small-btn btn-apply-aryaka" @click="$emit('confirm')">Confirm</button>
            </slot>
          </div>
        </div>

      </div>
    </div>
    <div class="modal-backdrop fade in"></div>
  </div>
</template>

<script>
  export default {
    name: 'app-modal-confirm',
    props: {
      modelClass: {
        type: String,
        required: false,
        default: ''
      }
    },
    mounted () {
      this.$nextTick(() => {
        const selector = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]'
        const focusableEls = this.$el.querySelectorAll(selector)
        const bodyEls = this.$el.getElementsByClassName('modal-body')[0].querySelectorAll(selector)
        this.focusableEls = Array.prototype.slice.call(focusableEls)

        this.firstFocusableEl = this.focusableEls[0]
        this.lastFocusableEl = this.focusableEls[this.focusableEls.length - 1]
        bodyEls[0] && bodyEls[0].focus()
      })
      document.body.style.overflow = 'hidden'
    },
    beforeDestroy () {
      delete this.firstFocusableEl
      delete this.lastFocusableEl
      delete this.focusableEls
      document.body.style.overflow = ''
    },
    methods: {
      handleKeyDown (e) {
        const KEY_TAB = 9
        const KEY_ESC = 27
        const KEY_ENTER = 13

        switch (e.keyCode) {
          case KEY_TAB:
            if (this.focusableEls.length === 1) {
              e.preventDefault()
              break
            }
            if (e.shiftKey) {
              this.handleBackwardTab(e)
            } else {
              this.handleForwardTab(e)
            }
            break
          case KEY_ESC:
            this.$emit('cancel')
            break
          case KEY_ENTER:
            this.$emit('confirm')
            break
          default:
            break
        }
      },
      handleForwardTab (e) {
        if (document.activeElement === this.lastFocusableEl) {
          e.preventDefault()
          this.firstFocusableEl.focus()
        }
      },
      handleBackwardTab (e) {
        if (document.activeElement === this.firstFocusableEl) {
          e.preventDefault()
          this.lastFocusableEl.focus()
        }
      }
    }
  }
</script>
