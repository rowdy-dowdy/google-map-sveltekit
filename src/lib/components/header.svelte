<script lang="ts">

</script>

<div class="sticky h-16 shadow bg-white z-50">
  <div class="w-full h-full flex items-center space-x-6 px-8">
    <a href="/" class="flex-none flex items-center space-x-1"
      ><img
        src="favicon.png"
        alt=""
        class="w-10 h-10 rounded"
      />
      <div class="logo-title">
        <h1 class="text-lg font-semibold">Việt Hùng IT</h1>
        <h5 class="text-xs text-gray-500">Developer . Transporter</h5>
      </div></a
    >
    
    <div class="hidden md:flex !ml-auto self-stretch items-stretch space-x-6">
      <div class="nav-link active">Địa điểm du lịch</div>
      <div class="dropdown">
        <div class="text">
          <span>Cở sở lưu trú</span>
          <span class="icon w-4 h-4"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M16.293 9.293 12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z"></path></svg></span>
        </div>
        <div class="menu">
          <div class="item">Cở sở lưu trú 1</div>
          <div class="item">Cở sở lưu trú 2</div>
          <div class="item">Cở sở lưu trú 3</div>
        </div>
      </div>
      <div class="nav-link">Tuyến Trekking</div>
      <div class="dropdown">
        <div class="text">
          <span>Nhà hàng</span>
          <span class="icon w-4 h-4"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M16.293 9.293 12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z"></path></svg></span>
        </div>
        <div class="menu">
          <div class="item">Nhà hàng 1</div>
          <div class="item">Nhà hàng 2</div>
          <div class="item">Nhà hàng 3</div>
        </div>
      </div>
      <div class="dropdown">
        <div class="text">
          <span>Khách sạn</span>
          <span class="icon w-4 h-4"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M16.293 9.293 12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z"></path></svg></span>
        </div>
        <div class="menu">
          <div class="item">Khách sạn 1</div>
          <div class="item">Khách sạn 2</div>
          <div class="item">Khách sạn 3</div>
        </div>
      </div>
    </div>

    <div class="!ml-auto">
      <a href="/" class="btn btn-red !rounded-lg">Đăng nhập</a>
    </div>
  </div>
</div>

<style lang="postcss">
  .nav-link {
    color: #333;
    @apply relative h-full inline-flex items-center border-b-2 border-transparent hover:border-b-orange-600 font-semibold cursor-pointer;
  }
  .nav-link.active {
    @apply border-b-orange-600 cursor-default pointer-events-none;
  }
  .dropdown {
    @apply relative;
  }
  .dropdown .text {
    color: #333;
    @apply h-full flex items-center border-b-2 border-transparent hover:border-b-orange-600 font-semibold space-x-1 cursor-pointer;
  }
  .dropdown::before {
    content: '';
    @apply absolute w-full h-2 top-full left-0;
  }
  .dropdown .menu {
    @apply hidden w-60 absolute left-1/2 top-[calc(100%+.5rem)] -translate-x-1/2 bg-white shadow py-2 rounded;
  }
  .dropdown:hover .menu {
    @apply block;
  }
  .dropdown .menu .item {
    @apply px-4 py-2 hover:bg-gray-100 w-full truncate cursor-pointer;
  }
</style>
