<script setup lang="ts">
  import { computed } from 'vue';
  import { Actions } from '@/types';
  import { StatusType } from '@/types';
  import type { SensorModel } from '@/types';
  import StandardButton from '@/components/StandardButton.vue';

  const props = defineProps<{
    sensor: SensorModel
  }>();

  const emits = defineEmits<{
    (eventName: 'delete', id: string) : void;
    (eventName: 'action', value: Actions, id: string) : void;
  }>();

  const actionName = computed(() : string => {
    if (props.sensor.status === StatusType.Connected) {
      return Actions.Train;
    } else if (props.sensor.status === StatusType.Trained) {
      return Actions.Deploy;
    } else return Actions.Reconnect;
  });

  const showActionButton = computed(() : boolean => {
    if (
      props.sensor.status === StatusType.Connected ||
      props.sensor.status === StatusType.Trained
    ) {
      return true;
    } else return false;
  });

  const showStatusBlink = computed(() : boolean => {
    if (
      props.sensor.status === StatusType.Deploying ||
      props.sensor.status === StatusType.Training
    ) {
      return true;
    } else return false;
  });

  const deleteSensor = () : void => {
    emits('delete', props.sensor.id);
  };

  const changeStatus = () : void => {
    if (props.sensor.status === StatusType.Connected) {
      emits('action', Actions.Train, props.sensor.id);
    } else if (props.sensor.status === StatusType.Trained) {
      emits('action', Actions.Deploy, props.sensor.id);
    }
  };
</script>

<template>
  <tr>
    <td>
      {{ props.sensor.tags }}
    </td>

    <td>
      {{ props.sensor.sensorType }}
    </td>

    <td>
      {{ props.sensor.version }}
    </td>

    <td>
      {{ props.sensor.name }}
    </td>

    <td :class="[$style.statusName, { blink: showStatusBlink }]">
      {{ props.sensor.status }}
    </td>

    <td>
      {{ props.sensor.lastChanged }}
    </td>

    <td :class="$style.actions">
      <StandardButton
        v-if="showActionButton"
        @click="changeStatus"
      >
        {{ actionName }}
      </StandardButton>

      <StandardButton
        is-red
        @click="deleteSensor"
      >
        Delete
      </StandardButton>
    </td>
  </tr>
</template>

<style lang="scss" module>
  .actions {
    min-width: 180px;
    display: grid;
    grid-auto-flow: column;
    gap: 12px;
    justify-content: end;
  }

  .statusName {
    min-width: 92px;

    &:global(.blink) {
      animation: blink 2s linear infinite;
    }
  }

  @keyframes blink {
    50% {
      opacity: 0.2;
    }
  }
</style>