<template>
  <div class="page-modal">
    <el-dialog
      v-model="dialogVisible"
      title="新增用户"
      width="30%"
      destroy-on-close
      center
    >
      <ly-from v-bind="modalConfig" v-model="formData" />
      <slot></slot>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="confirmClick">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'

import LyFrom from '@/components/el-form'
import { useStore } from '@/store'

export default defineComponent({
  name: 'page-modal',
  props: {
    modalConfig: {
      type: Object,
      require: true
    },
    defaultInfo: {
      type: Object,
      default: () => ({})
    },
    otherInfo: {
      type: Object,
      default: () => ({})
    },
    pageName: {
      type: String,
      require: true
    }
  },
  setup(props) {
    const dialogVisible = ref(false)
    const formData = ref<any>({})
    watch(
      () => props.defaultInfo,
      (newValue) => {
        for (const item of props.modalConfig?.formItems ?? []) {
          formData.value[`${item.field}`] = newValue[`${item.field}`]
        }
      }
    )

    // 添加 / 修改
    const store = useStore()
    const confirmClick = () => {
      if (Object.keys(props.defaultInfo).length > 0) {
        store.dispatch('systemModule/editDataAction', {
          pageName: props.pageName,
          editData: { ...formData.value, ...props.otherInfo },
          id: props.defaultInfo.id
        })
        dialogVisible.value = false
      } else {
        store.dispatch('systemModule/addDataAction', {
          pageName: props.pageName,
          newData: { ...formData.value, ...props.otherInfo }
        })
        dialogVisible.value = false
      }
    }
    return {
      dialogVisible,
      formData,
      confirmClick
    }
  },
  components: {
    LyFrom
  }
})
</script>

<style lang="less" scoped></style>
