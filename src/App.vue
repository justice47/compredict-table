<script setup lang="ts">
  import { ref } from 'vue';
  import { sleep } from '@/utils';
  import { tableData } from '@/data';
  import { Actions, StatusType } from '@/types';
  import type { Column } from '@/types';
  import StandardTable from '@/components/table/StandardTable.vue';

  const sensorsData = ref(tableData);
  const columns = ref<Column[]>([
    {
      name: 'Tags',
      dataProperty: 'tags'
    },

    {
      name: 'Sensor Type',
      dataProperty: 'sensorType'
    },

    {
      name: 'Sensor version',
      dataProperty: 'version'
    },

    {
      name: 'Name',
      dataProperty: 'name'
    },

    {
      name: 'Status',
      dataProperty: 'status'
    },

    {
      name: 'Last changed',
      dataProperty: 'lastChanged'
    },
  ])

  const deleteSensor = (index: string) : void => {
    sensorsData.value.splice(sensorsData.value.findIndex(sensor => sensor.id === index), 1);
  };

  const changeSensorStatus = async (action: Actions, id: string) : Promise<void> => {
    const sensorIndex = sensorsData.value.findIndex(sensor => sensor.id === id);

    if (action === Actions.Train) {
      sensorsData.value[sensorIndex].status = StatusType.Training;

      await sleep(5000)

      sensorsData.value[sensorIndex].status = StatusType.Trained;
    } else if (action === Actions.Deploy) {
      sensorsData.value[sensorIndex].status = StatusType.Deploying;

      await sleep(5000)

      sensorsData.value[sensorIndex].status = StatusType.Deployed;
    }
  };
</script>

<template>
  <main>
    <div :class="$style.panel">
      <StandardTable
        :data="sensorsData"
        :columns="columns"
        @delete-sensor="deleteSensor"
        @action="changeSensorStatus"
      />
    </div>
  </main>
</template>

<style lang="scss" module>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

.panel {
  background-color: #ffffff;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 8px;
  padding: 24px;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
