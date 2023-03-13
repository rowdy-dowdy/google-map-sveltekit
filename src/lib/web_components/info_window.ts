import { html, css, LitElement, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import Swiper, { Parallax } from 'swiper';
import swiperCss from "./swiper_css";

// @customElement('info-window')
class InfoWindow extends LitElement {
  static styles = [
    unsafeCSS(swiperCss),
    css`
      .info-window {
        width: 100%;
        max-width: 300px;
        /* padding: 10px; */
        /* width: 400px;
        background: #fff;
        padding: 10px;
        max-height: 500px;
        overflow-y: auto;
        border-radius: 3px;
        border: 1px solid #ccc; */
      }
    `,
    css`.shimmer {
      color: grey;
      display:block;
      -webkit-mask:linear-gradient(-60deg,#000 30%,#0005,#000 70%) right/300% 100%;
      background-repeat: no-repeat;
      animation: shimmer 2.5s infinite;
    }`,
    css`@keyframes shimmer {
      100% {-webkit-mask-position:left}
    }`,
    css`
      .swiper {
        width: 100%;
      }
    `,
    css`.swiper-slide {
      display: block;
      width: 100%;
      aspect-ratio: 4/3;
      overflow: hidden;
      border-radius: 5px;
    }`,
    css`.swiper-slide .swiper-lazy-preloader {
      width: 100%;
      height: 100%;
      animation: none !important;
      top: 0;
      left: 0;
      margin: 0 !important;
    }`,
    css`.swiper-slide img, .swiper-slide .shimmer {
      /* position: absolute; */
      display: block;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background-color: #ddd;
      object-fit: cover;
    }`,
    css`.title {
      font-size: 20px;
      padding: 0;
      margin: 5px 0;
    }`,
    css`.description {
      color: #444;
      font-size: 16px;
      margin: 0;
    }`,
    css`.content {
      margin: 5px 0;
      text-align: justify;
      border-top: 1px solid #ccc;
      padding-top: 5px;
    }`,
    css`.btn {
      background: #3b82f6;
      border: none;
      padding: 7px 12px;
      border-radius: 3px;
      color: #ebebeb;
      margin-top: 10px;
      cursor: pointer
    }
    .btn:hover {
      background: #60a5fa;
    }`,
    css`.btn-red {
      background: #f43f5e;
      float:right;
    }
    .btn-red:hover {
      background: #fb7185;
    }`
  ]

  @property({ type: String })
  title = 'Chợ Phiên Bắc Hà';

  @property({ type: String })
  description = 'Chợ Phiên Bắc Hà';

  @property({ type: Array<String> })
  images = [];

  render() {
    return html`
      <div class="info-window">
        <div class="swiper">
          <!-- Additional required wrapper -->
          <div class="swiper-wrapper">
            <!-- Slides -->
            ${
              this.images.map((image: string) => html`
                <div class="swiper-slide">
                  <img src="${image}" alt="title" loading="lazy" data-swiper-parallax="50%" />
                  <div class="swiper-lazy-preloader">
                    <div class="shimmer"></div>
                  </div>
                </div>
              `)
            }
            <!-- <div class="swiper-slide"><div class="shimmer"></div>Slide 2</div>
            <div class="swiper-slide"><div class="shimmer"></div>Slide 3</div> -->
          </div>
        </div>
        <h3 class="title">${this.title}</h3>
        <p class="description">${this.description}</p>
        <div class="content">Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis officiis ab, aut aperiam repellendus sequi, qui animi assumenda modi natus corrupti nesciunt nam autem laudantium magnam nihil eveniet nemo fugit.</div>
        <button class="btn">Xem địa điểm</button>
        <button class="btn btn-red">Chỉ đường</button>
      </div>
    `;
  }

  firstUpdated() {
    let swiperEl = this.renderRoot.querySelector('.swiper') as HTMLElement
    if (!swiperEl) return

    const swiper = new Swiper(swiperEl, {
      // Optional parameters
      // direction: 'vertical',
      modules: [Parallax],
      loop: true,
      parallax: true,
    });
  }
}

if (!customElements.get("info-window")) {
  customElements.define("info-window", InfoWindow);
}