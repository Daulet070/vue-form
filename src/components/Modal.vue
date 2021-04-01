<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header">default header</slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
