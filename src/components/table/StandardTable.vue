<script setup lang="ts">
  import { ref, computed } from 'vue';
  import { parseDate } from '@/utils';
  import { isValid, compareDesc, compareAsc } from 'date-fns';
  import type { SensorModel, Actions, SortDirection, Column } from '@/types'
  import TableRow from '@/components/table/TableRow.vue';

  const props = defineProps<{
    columns: Column[];
    data: SensorModel[]
  }>();

  const emits = defineEmits<{
    (eventName: 'deleteSensor', id: string): void;
    (eventName: 'action', value: Actions, id: string): void;
  }>();

  const columnSort = ref<keyof SensorModel>('lastChanged');
  const sortDirection = ref<SortDirection>('asc');

  const sortDirectionSymbol = computed(() => {
    if (sortDirection.value === 'asc') {
      return '▲';
    } else {
      return '▼';
    }
  });

  const sortedData = computed(() => {
    if (isValid(parseDate(props.data[0][columnSort.value]))) {
      if (sortDirection.value === 'asc') {
        return [...props.data].sort((a, b) => compareDesc(parseDate(a[columnSort.value]), parseDate(b[columnSort.value])));
      } else {
        return [...props.data].sort((a, b) => compareAsc(parseDate(a[columnSort.value]), parseDate(b[columnSort.value])));
      }
    } else if (sortDirection.value === 'asc') {
      return [...props.data].sort((a, b) => a[columnSort.value].localeCompare(b[columnSort.value]));
    } else {
      return [...props.data].sort((a, b) => b[columnSort.value].localeCompare(a[columnSort.value]));
    }
  });

  const sortByColumn = (dataProperty: keyof SensorModel): void => {
    if (dataProperty === columnSort.value) {
      if (sortDirection.value === 'asc') {
        sortDirection.value = 'desc';
      } else {
        sortDirection.value = 'asc';
      }
    } else {
      columnSort.value = dataProperty;
      sortDirection.value = 'asc';
    }
  };

  const sensorAction = (action: Actions, id: string) : void => {
    emits('action', action, id);
  }
</script>

<template>
  <table :class="$style.table">
    <thead>
      <tr>
        <th
          v-for="(column, index) in props.columns"
          :key="index"
          :class="$style.columnTitle"
          @click="sortByColumn(column.dataProperty)"
        >
          {{ column.name }}

          <span :class="$style.sortSymbol">
            <template v-if="column.dataProperty === columnSort">
              {{ sortDirectionSymbol }}
            </template>
          </span>
        </th>

        <th>
          Actions
        </th>
      </tr>
    </thead>

    <tbody>
      <TableRow
        v-for="(sensor, index) in sortedData"
        :key="index"
        :sensor="sensor"
        @delete="emits('deleteSensor', $event)"
        @action="sensorAction"
      />
    </tbody>
  </table>
</template>

<style lang="scss" module>
  .table {
    th {
      user-select: none;
      font-weight: 600;
      padding: 8px;
    }

    td {
      padding: 8px;
    }
  }

  .sortSymbol {
    display: inline-block;
    width: 18px;
  }

  .columnTitle {
    cursor: pointer;
  }
</style>
