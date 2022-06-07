package com.manage.controller;

import com.manage.mapper.ManageMapper;
import com.manage.pojo.LeaveMessage;
import com.manage.result.ResultData;
import com.manage.service.SendMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class ManageController {
    @Autowired
    private ManageMapper manageMapper;
    @Autowired
    private SendMessage sendMessage;
    @RequestMapping("/sendmail/{id}")
    @CrossOrigin
    public Map<String,Object> getAllMail(@PathVariable Integer id){
        List<LeaveMessage> list=manageMapper.queryByIdList(id);
        for(int i=0;i<list.size();i++){
            sendMessage.testMail(list.get(i).getAddress(),list.get(i).getMessage());
        }
        Map<String,Object> map=new HashMap<>();
        map.put("code","0");
        map.put("msg","成功");
        map.put("data","测试");
        return map;

    }

}
