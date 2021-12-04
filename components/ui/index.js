/** 基礎組件 */
import Select from './form/example/Select.vue';

/** 列表組件 */
import Search from './list/Search.vue';
import SearchWord from './list/SearchWord.vue';
import SearchTag from './list/SearchTag.vue';
import TableColumn from './list/TableColumn.vue';
import SortButton from './list/button/SortButton.vue';
import AddButton from './list/button/AddButton.vue';
import DetailButton from './list/button/DetailButton.vue';
import DeleteButton from './list/button/DeleteButton.vue';
import CopyButton from './list/button/CopyButton.vue';
import ExportButton from './list/button/xlsxExport.vue';
import MultipleButton from './list/button/MultipleButton.vue';

/** 表單組件 */
import FormOsType from './form/OsType.vue';
import FormRoomID from './form/RoomID.vue';
import FormEditStatus from './form/EditStatus.vue';
import FormStartEndTime from './form/StartEndTime.vue';
import FormUploadImg from './form/UploadImg.vue';
import FormUploadManyImg from './form/UploadManyImg.vue';
import FormUploadFile from './form/UploadFile.vue';
import FormUploadPDF from './form/UploadPDFFile.vue';
import UrlOpenBlank from './form/UrlOpenBlank.vue';
import FormTags from './form/Tags.vue';
import FormTagsWithSelect from './form/TagsWithSelect.vue';
import FormLangTab from './form/LangUsed.vue';
import FormVIPSelect from './form/VipSelect.vue';
import FormEventClass from './form/EventClass.vue';
import FormCancel from './form/button/cancel.vue';

/** 小工具 */
import TextEditor from '../ui/tool/TextEditor.vue';
import Summernote from '../ui/tool/htmlEditor.vue';
import ChatBubble from './tool/chatBubble.vue';

export default {
  install(Vue) {
    /** 基礎組件 */
    //  下拉選單
    Vue.component('Select', Select);

    /** 列表組件 */
    //  查詢
    Vue.component('Search', Search);
    //  關鍵字查詢
    Vue.component('SearchWord', SearchWord);
    //  條件查詢
    Vue.component('SearchTag', SearchTag);
    //  自動產列表
    Vue.component('TableColumn', TableColumn);
    //  跳轉排序頁面按鈕
    Vue.component('SortButton', SortButton);
    //  跳轉新增頁面按鈕
    Vue.component('AddButton', AddButton);
    //  跳轉詳細頁面按鈕
    Vue.component('DetailButton', DetailButton);
    //  刪除列表資料按鈕
    Vue.component('DeleteButton', DeleteButton);
    //  複製列表資料按鈕
    Vue.component('CopyButton', CopyButton);
    //  匯出列表資料按鈕
    Vue.component('ExportButton', ExportButton);
    //  列表多選開關按鈕
    Vue.component('MultipleButton', MultipleButton);
    

    /** 表單組件 */
    //  平台選擇
    Vue.component('FormOsType', FormOsType);
    //  大廳選擇
    Vue.component('FormRoomID', FormRoomID);
    //  編輯狀態
    Vue.component('FormEditStatus', FormEditStatus);
    //  編輯狀態
    Vue.component('FormStartEndTime', FormStartEndTime);
    //  上傳圖片
    Vue.component('FormUploadImg', FormUploadImg);
    //  上傳多張圖片
    Vue.component('FormUploadManyImg', FormUploadManyImg);
    //  上傳檔案
    Vue.component('FormUploadFile', FormUploadFile);
    //  上傳PDF檔案
    Vue.component('FormUploadPDF', FormUploadPDF);
    //  Client跳轉頁面組件
    Vue.component('UrlOpenBlank', UrlOpenBlank);
    //  tags
    Vue.component('FormTags', FormTags);
    //  tags + 選擇器
    Vue.component('FormTagsWithSelect', FormTagsWithSelect);
    //  語系tab產生
    Vue.component('FormLangTab', FormLangTab);
    //  Vip選擇
    Vue.component('FormVIPSelect', FormVIPSelect);
    //  賽事別
    Vue.component('FormEventClass', FormEventClass);
    //  取消跳轉回列表頁面按鈕
    Vue.component('FormCancel', FormCancel);
    //  文字編輯器
    Vue.component('TextEditor', TextEditor);
    //  HTML編輯器
    Vue.component('Summernote', Summernote);

    /** 小工具 */
    //  文字編輯器
    Vue.component('ChatBubble', ChatBubble);
  }
};

