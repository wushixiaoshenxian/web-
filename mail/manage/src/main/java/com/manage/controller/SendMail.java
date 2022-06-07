package com.manage.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Timer;
import java.util.TimerTask;

@RestController
public class SendMail {
    @Autowired
    private JavaMailSender mailSender;
    @RequestMapping("/email")
    public String getByMailSend() throws ParseException {
        SimpleMailMessage message = new SimpleMailMessage();
        String sendTime="2022-06-06 01:45:30";
        SimpleDateFormat simpleDateFormat=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date date=new Date();
        System.out.println("准备发送,现在时间为------------>"+simpleDateFormat.format(date));
        Timer timer=new Timer();
        timer.schedule(new TimerTask() {
            @Override
            public void run() {
                message.setFrom("renqingshiguceshi@163.com");
                message.setTo("1823637354@qq.com");
                message.setSubject("测试");
                message.setText("测试成功！！！");
                mailSender.send(message);
                System.out.println("邮件收到时间为----------->"+sendTime);
            }
        },new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").parse(sendTime));
        return "success";
    }
}
