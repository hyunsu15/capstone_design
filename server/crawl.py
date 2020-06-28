from multiprocessing import pool
from selenium import webdriver
from bs4 import BeautifulSoup
import time, os
import pandas as pd
import urllib.request
import urllib.parse
import json
from selenium.webdriver.common.keys import Keys



n_dis = 'next disabled'
act = 'ACTIVE'
inact = 'INACTIVE'
inact_hide = 'INACTIVE HIDDEN'


def pState(s2, s3, s4, s5, pNum):
    if s5 == inact_hide:
        if s4 == inact_hide:
            if s3 == inact_hide:
                if s2 == inact_hide:
                    pNum = 1
                else:
                    pNum = 2
            else:
                pNum = 3
        else:
            pNum = 4
    else:
        pNum = 5
    return pNum





area =  ['강원도', '경기도수원시', '경기도성남시', '경기도용인시',
'경기도안양시', '경기도안산시', '경기도과천시', '경기도광명시', '경기도광주시',
'경기도군포시', '경기도부천시', '경기도시흥시', '경기도김포시', '경기도안성시',
'경기도오산시', '경기도의왕시', '경기도이천시', '경기도평택시', '경기도하남시',
'경기도화성시', '경기도여주시', '경기도양평군', '경기도고양시', '경기도구리시',
'경기도남양주시', '경기도동두천시', '경기도양주시', '경기도의정부시',
'경기도파주시', '경기도포천시', '경기도연천군',
'경기도가평군', '경상남도', '경상북도', '광주광역시', '대구광역시',
'대전광역시', '부산광역시', '서울종로구', '서울중구', '서울용산구', '서울성동구',
'서울광진구', '서울동대문구', '서울중랑구', '서울성북구', '서울강북구',
'서울도봉구', '서울노원구', '서울은평구', '서울서대문구', '서울마포구',
'서울양천구', '서울강서구', '서울구로구', '서울금천구', '서울영등포구',
'서울동작구', '서울관악구', '서울서초구', '서울강남구', '서울송파구',
'서울강동구', '울산광역시', '인천광역시',
'전라남도', '전라북도', '제주특별자치도', '충청남도', '충청북도', '세종특별자치시']

store = [["대형마트", "롯데마트", "이마트", "홈플러스"],
         ["영화관", "CGV", "메가박스", "롯데시네마"],
         ["제과,베이커리", "파리바게뜨", "뚜레쥬르"],
         ["도넛", "던킨도너츠", "크리스피크림도넛"],
         ["피자", "피자헛", "도미노피자", "미스터피자", "파파존스", "피자스쿨"],
         ["백화점", "신세계백화점", "현대백화점", "롯데백화점", "NC백화점"],
         ["생활용품점","다이소"]]

location = 0
dataNum = 0
firstOpen = True
link = 'https://map.kakao.com/?from=total&nil_suggest=btn&tab=place&q='
driver = webdriver.Chrome('./chromedriver.exe')
keyward = ''
cate = ''
w_Dict = {}
t_Dict ={}
filterSwitch = True
fSwit = ''



for i in range(0,7):
    areaDic = {}
    for j in range(1,len(store[i])):
        term_Dic = {}
        while location < len(area):
            lan=" "+store[i][j]+" "+store[i][0]
            search = link + urllib.parse.quote_plus(area[location]) + urllib.parse.quote_plus(
                lan)
            # search = link + urllib.parse.quote_plus(keyward)
            driver.get(search)
            time.sleep(3)


            html = driver.page_source
            soup = BeautifulSoup(html, 'html.parser')
            npInfo = driver.find_elements_by_id('info.noPlace')
            page_1 = driver.find_element_by_id('info.search.page.no1')
            page_2 = driver.find_element_by_id('info.search.page.no2')
            page_3 = driver.find_element_by_id('info.search.page.no3')
            page_4 = driver.find_element_by_id('info.search.page.no4')
            page_5 = driver.find_element_by_id('info.search.page.no5')
            p_next = driver.find_element_by_id('info.search.page.next')
            pageNum = 0
            count = 0
            current = 1
            p1_state = str(page_1.get_attribute('class'))
            p2_state = str(page_2.get_attribute('class'))
            p3_state = str(page_3.get_attribute('class'))
            p4_state = str(page_4.get_attribute('class'))
            p5_state = str(page_5.get_attribute('class'))
            pn_state = str(p_next.get_attribute('class'))
            pageNum = pState(p2_state, p3_state, p4_state, p5_state, pageNum)
            while current < pageNum + 1:
                sub = driver.find_elements_by_css_selector('.subcategory.clickable')
                obj = driver.find_elements_by_css_selector('.PlaceItem.clickArea')
                title = driver.find_elements_by_css_selector('.link_name')
                score = driver.find_elements_by_css_selector('span.score > em.num')
                addr1 = driver.find_elements_by_css_selector('div.addr > p:nth-child(1)')  # div.addr > p:nth-child(1)
                addr2 = driver.find_elements_by_css_selector('div.addr > p.lot_number')  # div.addr > p.lot_number
                tel = driver.find_elements_by_css_selector('.phone')

                while count < len(obj):

                    d_title = str(title[count].get_attribute('innerText'))
                    d_sub = str(sub[count].get_attribute('innerHTML'))
                    d_score = str(score[count].get_attribute('innerText')) + ' / 5.0'
                    d_addr1 = str(addr1[count].get_attribute('innerText'))
                    d_addr2 = str(addr2[count].get_attribute('innerText'))
                    d_tel = str(tel[count].get_attribute('innerHTML'))

                    if d_sub==store[i][0]:
                        domainDic = {}
                        # 지역
                        domainDic['지점'] = d_title
                        # 도로명
                        domainDic['도로명 주소'] = d_addr1
                        # 지번
                        domainDic['지번 주소'] = d_addr2
                        # 번호
                        domainDic['번호'] = d_tel
                        # 평점
                        domainDic['평점'] = d_score

                        term_Dic[d_title] = domainDic

                    dataNum += 1
                    count += 1

                current += 1
                if current == 2:
                    if p1_state == inact and p2_state == inact:
                        break
                    elif p1_state == act and p2_state == inact:
                        page_2.send_keys(Keys.ENTER)
                        time.sleep(2)
                elif current == 3:
                    if p3_state == inact:
                        page_3.send_keys(Keys.ENTER)
                        time.sleep(2)
                elif current == 4:
                    if p4_state == inact:
                        page_4.send_keys(Keys.ENTER)
                        time.sleep(2)
                elif current == 5:
                    if p5_state == inact:
                        page_5.send_keys(Keys.ENTER)
                        time.sleep(2)
                elif current == 6:
                    if pn_state == n_dis:
                        print('')
                    else:
                        p_next.send_keys(Keys.ENTER)
                        time.sleep(2)
                        page_1 = driver.find_element_by_id('info.search.page.no1')
                        page_2 = driver.find_element_by_id('info.search.page.no2')
                        page_3 = driver.find_element_by_id('info.search.page.no3')
                        page_4 = driver.find_element_by_id('info.search.page.no4')
                        page_5 = driver.find_element_by_id('info.search.page.no5')
                        p_next = driver.find_element_by_id('info.search.page.next')
                        p1_state = str(page_1.get_attribute('class'))
                        p2_state = str(page_2.get_attribute('class'))
                        p3_state = str(page_3.get_attribute('class'))
                        p4_state = str(page_4.get_attribute('class'))
                        p5_state = str(page_5.get_attribute('class'))
                        pn_state = str(p_next.get_attribute('class'))
                        pageNum = pState(p2_state, p3_state, p4_state, p5_state, pageNum)
                        current = 1
                count = 0
            location += 1
            areaDic[store[i][j]] = term_Dic

        print(store[i][j], '에 대해 크롤링한 데이터 갯수 : ', dataNum)
        dataNum = 0
        location = 0

    w_Dict[store[i][0]]=areaDic

t_Dict["프랜차이즈"]=w_Dict




# json 파일로 저장
with open('./롯데백화점.json', 'w', encoding='utf-8') as f:
    json.dump(w_Dict, f, ensure_ascii=False, indent='\t')

end=datetime.datetime.now()
print(end-start)