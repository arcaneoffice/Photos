<template>
  <div ref="dropForm" class="drop-zone" @contextmenu.prevent>
    <input type="file" id="file" ref="file" multiple hidden v-on:change="doFileChanged" />
    <ProductHuntBanner />
    <div id="gallery">
      <nav>
        <div class="container">
          <div class="navbar-left">
            <div class="navbar-brand h6" ref="arcaneMenu" @click="isArcaneMenuOpend = true">
              Arcane
              <span class="photos">Photos</span>
              <div class="menu-panel" v-show="isArcaneMenuOpend">
                <a href="#" class="menu-item">
                  Arcane
                  <span class="photos">photos</span>
                </a>
                <a href="https://docs.arcaneoffice.com/Files.aspx" class="menu-item">
                  Arcane
                  <span class="docs">docs</span>
                </a>
                <a href="https://sheets.arcaneoffice.com/Files.aspx" class="menu-item">
                  Arcane
                  <span class="sheets">Sheets</span>
                </a>
              </div>
            </div>

            <button
              ref="signMenu"
              @click.prevent="isMenuOpen = !isMenuOpen"
              class="navbar-button sign link-2"
            >
              {{ userBlockstackId }}
              <img
                src="./assets/i_arrow_drop_down_24px.png"
                alt="Drop down arrow icon"
                srcset="./assets/i_arrow_drop_down_24px.png 1x, ./assets/i_arrow_drop_down_24px_2x.png 2x"
              />
              <div class="menu-panel caption" v-show="isMenuOpen">
                <div class="menu-item" @click="doLogout">Log Out</div>
              </div>
            </button>
          </div>

          <div class="navbar-right">
            <button
              class="navbar-button import link-2"
              @click.prevent="importFromGoogle"
              v-show="false"
            >
              <img
                class="navbar-button-img"
                src="@/assets/i_import_24px.png"
                alt="Plus icon"
                srcset="@/assets/i_import_24px.png 1x, @/assets/i_import_24px_2x.png 2x"
              />
              Import
            </button>
            <button class="navbar-button upload link-2" @click.prevent="openDialog">
              <img
                class="navbar-button-img"
                src="./assets/i_add_24px.png"
                srcset="./assets/i_add_24px.png 1x, ./assets/i_add_24px_2x.png 2x"
                alt="Plus icon"
              />
              Upload Photo
            </button>
          </div>
        </div>
      </nav>
      <div class="container main-body">
        <div id="uploadArea" v-if="images.length == 0" @click="openDialog">
          <div class="empty-area">
            <img
              class="empty-area-img"
              src="@/assets/i_empty_photo.png"
              alt="Empty photos gallery"
              srcset="@/assets/i_empty_photo.png 1x, @/assets/i_empty_photo_2x.png 2x"
            />
            <p class="empty-area-text body-2">
              Let’s add your photos.
              <br />Upload or drag some photos here.
            </p>
          </div>
        </div>
        <div class="image-tile-block" v-else>
          <div
            class="empty-tile-block"
            v-for="viewItem in viewItems"
            :key="viewItem.date.getDate()"
            v-show="!uploading"
          >
            <p class="view-item-date subtitle-2">{{ viewItem.date | dateFormater }}</p>
            <div class="empty-tile" v-for="n in viewItem.count" :key="n"></div>
          </div>
          <div :class="{gallery: !uploading}" ref="gallery">
            <div
              class="view-item-block"
              v-for="viewItem in viewItems"
              :key="viewItem.date.getDate()"
            >
              <p class="view-item-date subtitle-2">{{ viewItem.date | dateFormater }}</p>
              <a
                v-if="images[viewItem.from + i - 1]"
                class="galleryItem center-cropped"
                v-for="i in viewItem.count"
                :key="i"
                :href="images[viewItem.from + i - 1].fileName"
                :data-src="images[viewItem.from + i - 1].internalFileName"
                :download="images[viewItem.from + i - 1].fileName"
                @click.prevent
                @contextmenu.prevent="onRightClick($event)"
                ref="imageLink"
              >
                <img
                  :style="[ (images[viewItem.from + i - 1].width > images[viewItem.from + i - 1].height) ? {height: '100%', width: 'auto'} : {width: '100%', height:'auto'} ]"
                  :class="{'not-uploaded-yet': !images[viewItem.from + i - 1].uploaded}"
                  :src="bufferToImage(images[viewItem.from + i - 1],images[viewItem.from + i - 1].thumbnailBuffer)"
                />
                <span class="tile-hover"></span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <footer>
        <div class="container">
          <div class="footer-left">
            <p class="footer-copyright overline">© 2019 Arcane Co. All rights reserved.</p>
            <a href="#" class="footer-legal link-3">Legal</a>
          </div>
          <div class="footer-right">
            <iframe
              src="https://yvoschaap.com/producthunt/counter.html#href=https%3A%2F%2Fwww.producthunt.com%2Fr%2Fp%2F158360&layout=wide&type=vote"
              width="120"
              height="25"
              scrolling="no"
              frameborder="0"
              allowtransparency="true"
            ></iframe>
            <noscript>
              Created with
              <a
                href="https://yvoschaap.com/producthunt/button.html"
                target="_top"
              >Vote Button for Product Hunt</a>.
            </noscript>
          </div>
        </div>
      </footer>
      <div id="loading" v-show="isLoading">
        <header>
          <div class="container">
            <p class="header-brand h6">
              Arcane
              <span class="office">Office</span>
            </p>
          </div>
        </header>
        <main>
          <div>
            <div class="spinner-box">
              <span class="spinner"></span>
            </div>
          </div>
        </main>
      </div>
      <div class="menu-block">
        <div
          class="menu-panel subtitle-2"
          :style="isContextmenuOpen? {top: cordinate.top + 'px',left: cordinate.left + 'px'} : {top: -280 + 'px',left: -96 + 'px'}"
          v-show="isContextmenuOpen"
        >
          <div class="menu-item" @click="doDownloadImage">Download</div>
          <div class="menu-item" @click="doDeleteImage">Delete</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Component from "vue-class-component";
import Vue from "vue";
import { userSession } from "./user";
import Compressor from "./browser-image-compression";
import { setTimeout } from "timers";
import ProductHuntBanner from "./components/ProductHuntBanner.vue";
import { stringify } from "querystring";
import axios from "axios";

interface IImage {
  buffer: Buffer;
  thumbnailBuffer: Buffer;
  fileName: string;
  fileSize: number;
  internalFileName: string;
  type: string;
  uploaded: boolean;
  downloaded: boolean;
  date: number;
  width: number;
  height: number;
}

interface IHistory {
  f: string;
  s: number;
  i: string;
  m: string;
  d: number;
}

interface IViewItem {
  date: Date;
  from: number;
  count: number;
}

@Component({
  components: {
    ProductHuntBanner
  },

  filters: {
    dateFormater(date) {
      const today = new Date();
      const yesterday = new Date();
      yesterday.setDate(today.getDate() - 1);
      const tomorrow = new Date();
      tomorrow.setDate(today.getDate() + 1);
      if (
        date.getDate() == today.getDate() &&
        date.getMonth() == today.getMonth() &&
        date.getFullYear() == today.getFullYear()
      ) {
        return "Today";
      } else if (
        date.getDate() == yesterday.getDate() &&
        date.getMonth() == yesterday.getMonth() &&
        date.getFullYear() == yesterday.getFullYear()
      ) {
        return "Yesterday";
      } else if (
        date.getDate() == tomorrow.getDate() &&
        date.getMonth() == tomorrow.getMonth() &&
        date.getFullYear() == tomorrow.getFullYear()
      ) {
        return "Tomorrow";
      } else {
        const daysInWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const monthsInYear = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec"
        ];
        const weekday = daysInWeek[date.getDay()];
        const month = monthsInYear[date.getMonth()];
        const dayInMonth = date.getDate();
        const year = date.getFullYear();

        return `${weekday}, ${month} ${dayInMonth}, ${year}`;
      }
    }
  }
})
export default class App extends Vue {
  isMenuOpen: boolean = false;
  userBlockstackId = "UserBlockstackId";
  isArcaneMenuOpend: boolean = false;
  isLoading: boolean = false;
  lastImageId: string = "";
  cordinate = {
    top: -280,
    left: -96
  };
  isContextmenuOpen = false;

  uploading = false;
  files: IHistory[] = [];
  images: IImage[] = [];
  viewItems: IViewItem[] = [];

  doLogout() {
    userSession.signUserOut();
    window.location.href = window.location.origin;
  }

  openDialog() {
    (<HTMLInputElement>this.$refs.file).click();
  }

  importFromGoogle() {}

  updateGallery() {
    setTimeout(() => {
      if (<HTMLElement>this.$refs.gallery)
        if ((<HTMLElement>this.$refs.gallery).getAttribute("lg-uid")) {
          window.lightGallery(this.$refs.gallery, { selector: ".galleryItem" });
        } else {
          console.log("make gallery");
          var gallery = window.lightGallery(
            this.$refs.gallery,
            { selector: ".galleryItem" },
            (src, index, old) => {
              for (let i = 0; i < this.images.length; i++) {
                if (this.images[i].internalFileName == src) {
                  if (this.images[i].downloaded) {
                    src = this.bufferToImage(
                      this.images[i],
                      this.images[i].buffer
                    );
                    old.call(gallery, src, index);
                  } else {
                    this.downloadImage(i).then(() => {
                      if (this.images[i].downloaded) {
                        let src = this.bufferToImage(
                          this.images[i],
                          this.images[i].buffer
                        );
                        console.log("Calling Old");
                        old.call(gallery, src, index);
                      }
                    });
                  }
                }
              }
            }
          );
          gallery.delete = (e: HTMLElement) => {
            let id = e.getAttribute("data-src") as string;
            this.deleteImage(id, () => {
              gallery.destroy();
            });
          };
        }
    }, 200);
  }

  deleteImage(id: string, callback: any) {
    userSession.deleteFile("images/" + id).then(() => {
      userSession.deleteFile("thumbnails/" + id).then(() => {
        for (let i = 0; i < this.images.length; i++) {
          if (this.images[i].internalFileName == id) {
            this.images.splice(i, 1);
            for (let j = 0; j < this.viewItems.length; j++) {
              if (
                this.viewItems[j].from <= i &&
                this.viewItems[j].from + this.viewItems[j].count > i
              ) {
                this.viewItems[j].count--;
                if (this.viewItems[j].count == 0) {
                  this.viewItems.splice(j, 1);
                  j--;
                }
              } else if (this.viewItems[j].from > i) {
                this.viewItems[j].from--;
              }
            }
            break;
          }
        }
        for (let i = 0; i < this.files.length; i++) {
          if (this.files[i].i == id) {
            this.files.splice(i, 1);
            break;
          }
        }
        userSession
          .putFile("images.json", JSON.stringify(this.files), {
            encrypt: true
          })
          .then(() => {
            callback();
            this.updateGallery();
          });
      });
    });
  }

  mounted() {
    window.onresize = () => {
      this.isContextmenuOpen = false;
    };

    if (userSession.isSignInPending()) {
      userSession.handlePendingSignIn().then(() => {
        window.location.href = window.location.origin + "/app/";
      });
      return;
    }
    if (!userSession.isUserSignedIn()) {
      window.location.href = window.location.origin;
      return;
    }
    this.userBlockstackId = userSession.loadUserData().username;
    this.userBlockstackId = this.userBlockstackId.substr(
      0,
      this.userBlockstackId.length - 14
    );
    let self = this;
    const dragEvents = [
      "drag",
      "dragenter",
      "dragleave",
      "dragstart",
      "dragend",
      "dragover"
    ];
    dragEvents.forEach(
      function(event) {
        (<HTMLFormElement>self.$refs.dropForm).addEventListener(
          event,
          function(e: DragEvent) {
            e.preventDefault();
          }.bind(self),
          false
        );
      }.bind(self)
    );

    (self.$refs.dropForm as HTMLFormElement).addEventListener(
      "drop",
      function(e: DragEvent) {
        self.doDrop(e);
      }.bind(self)
    );

    this.updateGallery();

    this.downloadPreviousFiles().then(() => {
      this.updateGallery();
    });

    window.onbeforeunload = () => {
      for (let i = 0; i < this.images.length; i++)
        if (!this.images[i].uploaded)
          return "One or more images doesn't uploaded yet, Are you sure to leave ?";
      return;
    };
  }

  async downloadPreviousFiles() {
    this.isLoading = true;
    let fileString = "";
    try {
      fileString = (await userSession.getFile("images.json", {
        decrypt: true
      })) as string;
      this.files = JSON.parse(fileString as string) || [];
    } catch {
      fileString = "";
      this.files = [];
    }

    this.files.sort((a, b) => {
      return a.d > b.d ? 1 : a.d == b.d ? 0 : -1;
    });

    let viewItem = <IViewItem>{
      date: new Date(),
      from: 0,
      count: 0
    };

    for (let i = this.files.length - 1; i >= 0; i--) {
      let currentDate = new Date(this.files[i].d);
      if (viewItem.from == 0 && viewItem.count == 0) {
        viewItem.date = currentDate;
        this.viewItems.push(viewItem);
      }

      if (
        viewItem.date.getMonth() != currentDate.getMonth() ||
        viewItem.date.getFullYear() != currentDate.getFullYear() ||
        viewItem.date.getDate() != currentDate.getDate()
      ) {
        viewItem = <IViewItem>{
          date: currentDate,
          from: viewItem.from + viewItem.count,
          count: 0
        };
        this.viewItems.push(viewItem);
      }
      viewItem.count++;
    }

    for (let i = this.files.length - 1; i >= 0; i--) {
      let ui = <IImage>{
        buffer: Buffer.alloc(0),
        thumbnailBuffer: Buffer.alloc(0),
        fileName: this.files[i].f,
        fileSize: this.files[i].s,
        internalFileName: this.files[i].i,
        type: this.files[i].m,
        downloaded: false,
        uploaded: true,
        date: this.files[i].d
      };

      await this.downloadThumbnail(ui);
      await this.images.push(ui);
      this.isLoading = false;
      this.updateGallery();
    }
    this.isLoading = false;
  }

  doDrop(e: DragEvent) {
    e.preventDefault();
    if (e.dataTransfer)
      for (let i = 0; i < e.dataTransfer.files.length; i++) {
        if (e.dataTransfer.files[i].type.startsWith("image")) {
          this.queueUpload(e.dataTransfer.files[i]);
        }
      }
  }

  doFileChanged(e) {
    e.preventDefault();
    if (e.target && e.target.files)
      for (let i = 0; i < e.target.files.length; i++) {
        if (e.target.files[i].type.startsWith("image")) {
          this.queueUpload(e.target.files[i]);
        }
      }
  }

  bufferToImage(image: IImage, buffer: Buffer) {
    let objUrl = window.URL.createObjectURL(
      new File([buffer], image.fileName, { type: image.type })
    );
    let img = new Image();
    img.onload = () => {
      image.width = img.width;
      image.height = img.height;
    };
    img.src = objUrl;
    return objUrl;
  }

  readFile(file: File): Promise<ArrayBuffer> {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();
      reader.onloadend = (e: any) => {
        resolve(e.target.result as ArrayBuffer);
      };
      reader.readAsArrayBuffer(file);
    });
  }

  async queueUpload(file: File) {
    let rndName = Buffer.from(
      await window.crypto.getRandomValues(new Uint8Array(16))
    ).toString("hex");
    let ui = <IImage>{
      buffer: Buffer.from(await this.readFile(file)),
      thumbnailBuffer: Buffer.from(
        await this.readFile((await Compressor(file, {
          maxWidthOrHeight: 512,
          useWebWorker: false
        })) as File)
      ),
      fileName: file.name,
      fileSize: file.size,
      internalFileName: rndName,
      type: file.type,
      downloaded: true,
      uploaded: false,
      date: Date.now()
    };

    this.bufferToImage(ui, ui.thumbnailBuffer);

    let currentDate = new Date(ui.date);
    if (this.viewItems.length == 0) {
      this.viewItems.push({
        from: 0,
        count: 1,
        date: new Date(ui.date)
      });
    } else {
      if (
        this.viewItems[0].date.getMonth() != currentDate.getMonth() ||
        this.viewItems[0].date.getFullYear() != currentDate.getFullYear() ||
        this.viewItems[0].date.getDate() != currentDate.getDate()
      ) {
        this.viewItems.unshift({
          date: currentDate,
          from: 0,
          count: 1
        });
        for (let i = 1; i < this.viewItems.length; i++)
          this.viewItems[i].from++;
      } else {
        this.viewItems[0].count++;
        for (let i = 1; i < this.viewItems.length; i++)
          this.viewItems[i].from++;
      }
    }
    await this.images.unshift(ui);
    this.updateGallery();
    await this.startUploading();
  }

  async startUploading() {
    if (this.uploading) return;
    this.uploading = true;
    try {
      let found = true;
      while (found) {
        found = false;
        for (let i = 0; i < this.images.length; i++) {
          if (!this.images[i].uploaded) {
            await this.uploadImage(this.images[i]);
            found = true;
          }
        }
      }
    } finally {
      this.uploading = false;
      this.updateGallery();
    }
  }

  async uploadImage(data: IImage) {
    console.log("Uploading");
    await userSession.putFile("images/" + data.internalFileName, data.buffer, {
      encrypt: true
    });
    await userSession.putFile(
      "thumbnails/" + data.internalFileName,
      data.thumbnailBuffer,
      {
        encrypt: true
      }
    );
    this.files.push({
      f: data.fileName,
      s: data.fileSize,
      i: data.internalFileName,
      m: data.type,
      d: data.date
    });
    await userSession.putFile("images.json", JSON.stringify(this.files), {
      encrypt: true
    });
    data.uploaded = true;
  }

  async downloadThumbnail(image: IImage) {
    await userSession
      .getFile("thumbnails/" + image.internalFileName, {
        decrypt: true
      })
      .then(d => {
        image.thumbnailBuffer = Buffer.from(d as ArrayBuffer);
      });
  }

  async downloadImage(index: number) {
    if (this.images[index].downloaded == true) return;
    this.images[index].downloaded = true;
    await userSession
      .getFile("images/" + this.images[index].internalFileName, {
        decrypt: true
      })
      .then(d => {
        this.images[index].buffer = Buffer.from(d as ArrayBuffer);
      });
  }

  documentClick(e) {
    let el = this.$refs.signMenu;
    let target = e.target;
    if (el !== target && !el.contains(target)) {
      this.isMenuOpen = false;
    }
  }

  ArcaneMenuDocumentClick(e) {
    let el = this.$refs.arcaneMenu;
    let target = e.target;
    if (el !== target && !el.contains(target)) {
      this.isArcaneMenuOpend = false;
    }
  }

  contextMenuDocumentClick(e) {
    let el = this.$refs.arcaneMenu;
    let target = e.target;
    if (el !== target && !el.contains(target)) {
      this.isArcaneMenuOpend = false;
    }
  }

  onRightClick(event: MouseEvent) {
    this.cordinate.left = event.pageX;
    this.cordinate.top = event.pageY;
    this.isContextmenuOpen = true;
    let el = event.composedPath()[1] as HTMLElement;
    this.lastImageId = el.getAttribute("data-src") as string;
  }

  onLeftClick(event: any, i: any) {
    console.log(this.$refs.imageLink);
    let element = this.$refs.imageLink[i];
    let target = event.target;
    if (element !== target) {
      this.isContextmenuOpen = false;
    }
  }

  saveFile(fileData: ArrayBuffer, fileType: string, fileName: string) {
    return new Promise(function(resolve, reject) {
      const blob = new Blob([new DataView(fileData)], {
        type: fileType
      });

      if (navigator.msSaveBlob) {
        navigator.msSaveBlob(blob, fileName);
        return resolve();
      } else if (/iPhone|fxios/i.test(navigator.userAgent)) {
        const reader = new FileReader();
        reader.addEventListener("loadend", function() {
          if (reader.error) {
            return reject(reader.error);
          }
          if (reader.result) {
            const a = document.createElement("a");
            a.href = reader.result as string;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
          }
          resolve();
        });
        reader.readAsDataURL(blob);
      } else {
        const downloadUrl = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = downloadUrl;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        URL.revokeObjectURL(downloadUrl);
        setTimeout(resolve, 100);
      }
    });
  }

  doDownloadImage() {
    for (let i = 0; i < this.images.length; i++) {
      if (this.images[i].internalFileName == this.lastImageId) {
        this.downloadImage(i).then(e => {
          this.saveFile(
            this.images[i].buffer.buffer,
            this.images[i].type,
            this.images[i].fileName
          );
        });
      }
    }
  }

  doDeleteImage() {
    this.deleteImage(this.lastImageId, () => {});
  }

  created() {
    document.addEventListener("click", this.documentClick);
    document.addEventListener("click", this.ArcaneMenuDocumentClick);
    document.addEventListener("click", this.onLeftClick);
  }
  destroyed() {
    document.removeEventListener("click", this.documentClick);
    document.removeEventListener("click", this.ArcaneMenuDocumentClick);
    document.addEventListener("click", this.onLeftClick);
  }
}
</script>


<style lang="scss">
* {
  box-sizing: border-box;
}

html,
body {
  margin: 0;
  padding: 0;
  width: 100%;
  min-height: 100vh;
}

body {
  display: flex;
}

.container {
  margin: 0 64px;
  @include until($tablet) {
    margin: 0 24px;
  }
}

button,
input,
a {
  margin: 0;
  padding: 0;
  border: none;
  background-color: transparent;
  outline: none;
}

p {
  margin: 0;
}

button {
  cursor: pointer;
}

#gallery {
  display: flex;
  flex-direction: column;
  position: relative;
  min-height: 100%;
  overflow-x: hidden;

  .menu-block {
    @include menu() {
      width: 140px;
      transform: translate(0, -16px);
    }
  }
}

nav {
  background-color: $white;
  flex: 0;

  .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 80px;
    min-height: auto;

    @include until($tablet) {
      flex-wrap: wrap;
      height: auto;
      min-height: 80px;
    }
  }

  .navbar-left {
    display: flex;
    align-items: center;
    @include until($tablet) {
      height: 80px;
      flex-basis: 100%;
      justify-content: space-between;
    }

    .navbar-brand {
      color: $black-high;
      margin: 0 20px 0 0;
      position: relative;
      cursor: pointer;

      @include menu() {
        width: 195px;
        top: 0;
        left: 0;

        .menu-item {
          padding: 11px 24px 12px 24px;
          text-decoration: none;
        }
      }

      .docs {
        color: $docs;
      }

      .sheets {
        color: $sheets;
      }

      .photos {
        color: $photos;
      }
    }

    .navbar-button {
      &.sign {
        color: $black-low;
        display: flex;
        align-items: center;
        position: relative;
        margin: 8px 0 0 -8px;
        padding: 4px 0 4px 8px;
        border-radius: 2px;
        transition: background-color 150ms ease-in-out;

        @include menu() {
          width: 160px;
          top: 0;
          left: 0;
          @include until($tablet) {
            top: 0;
            left: auto;
            right: 0;
          }
        }

        &:hover {
          background-color: $black-overlay-4;
        }

        &:active {
          background-color: $black-overlay-8;
        }
      }
    }
  }

  .navbar-right {
    margin: 8px 0 0;
    display: flex;
    align-items: center;

    @include until($tablet) {
      height: 48px;
      flex-basis: 100%;
      justify-content: flex-end;
      margin: 0;
    }

    .navbar-button {
      background-color: $photos;
      color: $white;
      padding: 8px 16px 8px 10px;
      border-radius: 5px;
      margin: 0 20px 0 0;
      transition: all 150ms ease-in-out;

      &:last-child {
        margin: 0;
      }

      &.upload {
        display: flex;
        align-items: center;
      }

      .navbar-button-img {
        width: 24px;
        height: 24px;
        margin: 0 8px 0 0;
      }

      &:hover {
        background-color: $photos-link-hover;
      }

      &:active {
        background-color: $photos-link-press;
      }

      &.import {
        background-color: $white;
        color: $black-medium;
        position: relative;
        display: flex;
        align-items: center;

        transition: background-color 150ms ease-in-out;

        &:hover {
          background-color: $black-overlay-4;
        }

        &:active {
          background-color: $black-overlay-8;
        }

        @include menu() {
          width: 195px;
          top: 0;
          right: 0;
        }

        .navbar-button-img {
          margin: 0 12px 0 0;
        }
      }
    }
  }
}

.drop-zone {
  width: 100%;
  .main-body {
    position: relative;
    display: flex;
    padding: 40px 0 0;
    flex: 1;
    @include until($tablet) {
      padding: 30px 0 0;
      flex: auto;
      height: auto;
      min-height: calc(100% - 128px);
    }

    div[class="gallery"] {
      position: absolute;
      top: 0;
      width: 100%;
    }

    .empty-tile-block {
      margin: 0 0 48px;
      .empty-tile {
        display: inline-block;
        overflow: hidden;
        background-color: $black-overlay-2;
        margin: 0 4px 0 0;
        &::before {
          content: "";
          display: block;
          padding-top: 100%;
        }

        @include until($tablet) {
          width: calc((100% - 12px) / 4);
          &:nth-child(4n + 1) {
            margin: 0;
          }
        }

        @include tablet-only {
          width: calc((100% - 20px) / 6);
          &:nth-child(6n + 1) {
            margin: 0;
          }
        }

        @include from($desktop) {
          width: calc((100% - 28px) / 8);
          &:nth-child(8n + 1) {
            margin: 0;
          }
        }
      }

      .view-item-date {
        color: $black-medium;
        margin: 0 0 17px;
      }
    }
  }
}

.image-tile-block {
  position: relative;
  width: 100%;
  height: 100%;
}

.view-item-block {
  margin: 0 0 48px;
  .view-item-date {
    color: transparent;
    margin: 0 0 17px;
  }
}

.center-cropped {
  position: relative;
  display: inline-block;
  overflow: hidden;
  background-color: $black-overlay-2;
  margin: 0 4px 0 0;
  transition: opacity 150ms ease-in-out;
  &::before {
    content: "";
    display: block;
    padding-top: 100%;
  }

  @include until($tablet) {
    width: calc((100% - 12px) / 4);
    &:nth-child(4n + 1) {
      margin: 0;
    }
  }

  @include tablet-only {
    width: calc((100% - 20px) / 6);
    &:nth-child(6n + 1) {
      margin: 0;
    }
  }

  @include from($desktop) {
    width: calc((100% - 28px) / 8);
    &:nth-child(8n + 1) {
      margin: 0;
    }
  }

  @include menu() {
  }
}

.center-cropped img {
  display: inline-block;
  width: auto;
  height: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.tile-hover {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: block;
  transition: background-color 100ms ease-in-out;
  &:hover {
    background-color: rgba($color: #000000, $alpha: 0.12);
  }
}

.not-uploaded-yet {
  opacity: 0.32;
}

#uploadArea {
  margin: auto;
  z-index: 15;
  font-size: 18px;
  text-align: center;
  color: $black-low;

  .empty-area {
    padding: 0 0 105px;
    margin: auto;

    .empty-area-img {
      margin: 0 0 27px;
    }
  }
}

footer {
  background-color: $white;
  z-index: 20;
  .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 73px;

    @include until($tablet) {
      flex-wrap: wrap;
      padding: 15px 0;
    }
  }

  .footer-left {
    display: flex;
    align-items: center;
    @include until($tablet) {
      flex-basis: 100%;
      order: 1;
    }

    .footer-copyright {
      color: $black-low;
      margin: 0 8px 0 0;
    }

    .footer-legal {
      color: $black-medium;
      text-decoration: none;
    }
  }

  .footer-right {
    margin: 0 -32px 0 0;
    @include until($tablet) {
      flex-basis: 100%;
      order: 0;
      margin: 0;
    }
  }
}

#loading {
  z-index: 20;
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: $white;

  display: flex;
  flex-direction: column;
  height: 100%;

  header {
    display: flex;
    align-items: center;
    color: $black-high;
    height: 64px;

    .header-brand {
      .office {
        color: $black-low;
      }
    }
  }

  main {
    display: flex;
    padding: 0;
    flex: 1;

    div {
      margin: auto;
      text-align: center;
      color: $black-medium;
      position: relative;

      .spinner-box {
        margin: 0 0 105px;

        .spinner {
          border: 3px solid #dae0e0;
          border-top-color: #687070;
          border-right-color: #687070;
          border-radius: 50%;
          width: 1.5em;
          height: 1.5em;
          animation: spin 1s linear infinite;
          position: absolute;
          top: calc(50% - 0.75rem);
          left: calc(50% - 0.75rem);
          z-index: 2;
        }
      }

      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }
    }
  }
}
</style>
