<template>
  <div>
    <div></div>
    <input
        :type="type"
        :placeholder="placeholder"
        :disabled="disabled"
        :value="val"
        @input="onInput"
    >
  </div>
</template>

<script>
export default {
  name: 'FineInput',
  props: {
    value: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: null
    },
    label: {
      type: String,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    validate: {
      type: [Function, Boolean, String, Number, Array, Object],
      default: false
    },
    valid: {
      type: Function,
      default: null
    },
    invalid: {
      type: Function,
      default: null
    },
    max: {
      type: Number,
      default: null
    },
    limit: {
      type: Boolean,
      default: false
    },
    min: {
      type: Number,
      default: null
    },
    sync: {
      type: Boolean,
      default: true
    }
  },
  data: () => ({}),
  computed: {
    val: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      }
    }
  },
  methods: {
    checkLength (val) {
      if (this.min !== null && this.min > val.length) {
        this.$emit('invalid', {
          type: 'min',
          value: this.min
        })

        if (this.invalid) this.invalid({
          type: 'min',
          value: this.min
        })

        return false
      }

      if (this.max !== null && this.max < val.length) {
        this.$emit('invalid', {
          type: 'max',
          value: this.max
        })

        if (this.invalid) this.invalid({
          type: 'max',
          value: this.max
        })

        return false
      }

      return true
    },
    checkValidation (val) {
      if (this.validate) {
        if (typeof this.validate === 'function') {
          if (!this.validate(val)) {
            this.$emit('invalid', {
              type: 'validate',
              value: val
            })

            if (this.invalid) this.invalid({
              type: 'validate',
              value: val
            })

            return false
          }
        } else {
          if (this.validate !== val) {
            this.$emit('invalid', {
              type: 'validate',
              value: val
            })

            if (this.invalid) this.invalid({
              type: 'validate',
              value: val
            })

            return false
          }
        }
      }

      return true
    },
    onInput (event) {
      const val = event.target.value
      this.$emit('inject', val)
      this.checkLength(val)
      this.checkValidation(val)

      if (this.limit && this.max !== null && this.max > val.length) {
        this.val = val
        this.$emit('input', val)

        this.$emit('valid', val)
        if (this.valid) this.valid(val)
      }
    }
  }
}
</script>

<style scoped lang="scss">
input {

}
</style>
