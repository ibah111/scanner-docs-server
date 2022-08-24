import { Type } from 'class-transformer';

export class Result {
  /**
   * ID записи
   */
  id: number;

  /**
   * Дата поступления
   */
  @Type(() => Date)
  date_post: Date;

  /**
   * Учет конвертов
   */
  convert: boolean;

  /**
   * Приставы
   */
  pristavi: boolean;

  /**
   * Адрес отправителя
   */
  adr_otp: string;

  /**
   * Отправитель
   */
  otprav: string;

  /**
   * Реестр
   */
  reestr: string;

  /**
   * Название документа
   */
  doc_name: string;

  /**
   * Название документа в архиве
   */
  doc_name_arhive: string;

  /**
   * Название документа в Архиве ИД
   */
  doc_name_arhive_id: string;

  /**
   * ID документа (не используется)
   */
  id_doc_name: number;

  /**
   * ID дела
   */
  id_dela: number;

  /**
   * ID долга
   */
  id_dolga: number;

  /**
   * ID должника
   */
  id_dolgnika: number;

  /**
   * Статья и пункт
   */
  st_pnkt: string;

  /**
   * ГД - Гражданское дело
   */
  gd: string;

  /**
   * ФИО должника
   */
  fio_dol: string;

  /**
   * КД - Кредитный договор
   */
  kd: string;

  /**
   * Исполнитель задачи
   */
  ispol_zadach: string;

  /**
   * ID исполнителя задачи
   */
  id_ispol_zadach: number;

  /**
   * ФИО взыскателя
   */
  vsisk: string;

  /**
   * ID взыскателя
   */
  id_vsisk: number;

  /**
   * Когда обработано
   */
  @Type(() => Date)
  kogda_otdano: Date;

  /**
   * Кто обработал
   */
  kto_obrabotal: string;

  /**
   * ID кто обработал
   */
  id_kto_obrabotal: number;

  /**
   * Скан
   */
  nal_skan: boolean;

  /**
   * ID Задачи
   */
  id_zadach: number;

  /**
   * Флаг архива
   */
  arhive: boolean;

  /**
   * флаг архива ИД
   */
  arhive_id: boolean;

  /**
   * Короб архива
   */
  korob_arhive: number;

  /**
   * Короб архива ИД
   */
  korob_arhive_id: number;

  /**
   * Дата обработки архива
   */
  @Type(() => Date)
  data_obrabotki_arhive: Date;

  /**
   * Дата обработки архива ИД
   */
  @Type(() => Date)
  data_obrabotki_arhive_id: Date;

  /**
   * Кто обработал архив
   */
  kto_obrabotal_arhive: string;

  /**
   * Кто обработал архив ИД
   */
  kto_obrabotal_arhive_id: string;

  /**
   * ID пользователя архив bitrix
   */
  id_bitrix_arhive: number;

  /**
   * ID пользователя архив ИД bitrix
   */
  id_bitrix_arhive_id: number;

  /**
   * Проверено взыскателем
   */
  check_vsisk: boolean;

  /**
   * Кем проверено
   */
  check_vsisk_name: string;

  /**
   * Тип почты
   */
  mode: number;

  /**
   * Истец, взыскатель
   */
  ist: string;

  /**
   * Дата вынесения документа
   */
  @Type(() => Date)
  dateDoc: Date;

  /**
   * ЕЦП
   */
  ecp: string;

  /**
   * Откуда
   */
  adres: string;

  /**
   * На какую почту
   */
  mail: string;
}
