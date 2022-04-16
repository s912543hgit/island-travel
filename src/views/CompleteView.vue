<template>
    <div class="section">
      <div class="background-image background-image--complete"></div>
      <div class="background-title">
        <h2 class="fw-bold">完成訂單</h2>
      </div>
    </div>
    <div class="position-relative d-flex">
      <div class="container container--complete">
        <div class="mt-5">
          <ul class="p-steps list-unstyled mb-5">
            <li class="col-4 mb-md-0 mb-3">
              <small>STEP1</small>
              <p>填寫資料</p>
            </li>
            <li class="col-4 mb-md-0 mb-3">
              <small>STEP2</small>
              <p>確認訂單</p>
            </li>
            <li class="col-4 is-active">
              <small>STEP3</small>
              <p>完成訂單</p>
            </li>
          </ul>
          <div class="container--center">
              <h2>完成訂單</h2>
              <p>感謝您的光臨，我們期待與您一起啟程！</p>
              <RouterLink class="btn btn-primary mt-4 px-5" to="/">回到首頁</RouterLink>
          </div>
        </div>
      </div>
    </div>
</template>
