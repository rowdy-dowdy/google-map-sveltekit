<script lang="ts">
  import "$lib/web_components/info_window";
  import { alertStore } from "../../../stores/alert";

  let data = {
    title: "Chợ Phiên Bắc Hà",
    description: "Chợ Phiên Bắc Hà",
    images: [
      "https://services-ap1.arcgis.com/7uR9jgwLb9JgoSB0/arcgis/rest/services/DiemDuLich_BacHa_view/FeatureServer/0/76/attachments/284"
    ],
    position: { lat: 21.586593, lng: 105.831771 }
  }

  let option = "success"
  const add = () => {
    alertStore.addAlert({
      type: option as any
    })
  }
</script>

{@html `<info-window title="${data.title}" />`}

<select name="" id="" bind:value={option}>
  <option value="success">success</option>
  <option value="warning">warning</option>
  <option value="error">error</option>
</select>
<button on:click={add}>add</button>