import React from "react";
import {Table} from "reactstrap";
import shortid from "shortid";
import AdminNewsView from "./AdminNewsView";

export default function AdminNews_List(news){

  const getNewsList = (
    Object.entries(news).map((prop) =>{
      return (
        <tr style={{cursor: 'pointer'}} key={shortid()} onClick={()=>window.location.replace('/admin/news/'+prop[1].id)}>
          <td style={{fontSize: `1em`, fontWeight: `bold`}} key={shortid()}>{prop[1].date}</td>
          <td style={{fontSize: `1em`,}} key={shortid()}>
            {
              localStorage.getItem('language') == 'ru'
                ? prop[1].heading_ru
                : prop[1].heading_en
            }
          </td>
          <td></td>
        </tr>
      )
    })
  );

  return (
    <>
    <button className={'btn btn-primary m-3'} onClick={() =>{window.location.pathname = '/admin/news/new'}}>
      {
        localStorage.getItem('language') == 'ru'
        ? "Добавить новость" : 'Add news'
      }
    </button>
    <div className={"table-responsive"}>
      <Table className={"table-info table-hover table"}>
        <thead className={'thead-light'}/*style={{backgroundColor: `#1171ef`}}*/>
        <tr className={"text-white text-center"}>
          <th colSpan={5} style={{fontSize: `1.2em`}}>
            {localStorage.getItem("language") == "ru"? "Список новостей" : "News list"}
          </th>
        </tr>
        <tr className={"text-white"}>
          <th scope={"col-2"} style={{fontSize: `1.2em`}}>{localStorage.getItem("language") == "ru"? 'Дата' : 'Date'}</th>
          <th scope={"col-9"} style={{fontSize: `1.2em`}}>{localStorage.getItem("language") == "ru"? 'Заголовок' : 'Heading'}</th>
          <th scope={"col-1"} style={{fontSize: `1.2em`}}>{localStorage.getItem("language") == "ru"? 'Действие' : 'Action'}</th>
        </tr>
        </thead>
        <tbody className={"bg-white"}>
        {getNewsList}
        </tbody>
      </Table>
    </div>
      </>
  )
}
