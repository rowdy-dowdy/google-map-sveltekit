<script>
  import AuthFormRegister from "./_auth_form_register.svelte";
</script>

<div class="flex h-full w-full flex-col justify-between space-y-8">
  <div class="flex items-center justify-end space-x-4">
    <p>Already have an account?</p>
    <a href="/auth/login" class="block rounded border px-4 py-2 font-semibold hover:bg-gray-100">Login</a>
  </div>

  <div>
    <h3 class="text-2xl uppercase">REGISTER</h3>
    <h5 class="mt-4 text-4xl font-semibold text-gray-800">Welcome Back</h5>
    <p class="mt-4">Please enter your account details</p>

    <AuthFormRegister/>

    <p class="!mt-12 text-gray-500">This site is protected by reCaptcha v3 and the Google</p>
    <p class="!mt-2 text-gray-500">
      <a href="/" class="underline">Privacy Policy</a>
      <span> and </span>
      <a href="/" class="underline">Teams of Use</a>
    </p>
  </div>

  <div class="flex items-center space-x-8">
    <a href="/" class="hover:underline">Teams Of Use</a>
    <a href="/" class="hover:underline">Privacy Policy</a>
    <a href="/" class="hover:underline">Cookie Policy</a>
    <a href="/" class="hover:underline">Status Page</a>
    <a href="/" class="hover:underline">Contact us</a>
  </div>
</div>