package com.manage.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import java.util.Date;

//@SpringBootTest
@Service
public class SendMessage {
    @Autowired
    private JavaMailSender mailSender;
    //String from,String to,String subject,String text
    public void testMail(String to,String text){
        //MimeMessage mimeMessage=mailSender.createMimeMessage();
        SimpleMailMessage message=new SimpleMailMessage();
//        message.setFrom("renqingshiguceshi@163.com");
//        message.setTo("1823637354@qq.com");
//        message.setSubject("测试");
//        message.setText("测试成功！！！");
        message.setFrom("renqingshiguceshi@163.com");
        message.setTo(to);
        message.setSubject("标题");
        message.setText(text);
        message.setSentDate(new Date());
        System.out.println("----->"+text);
        mailSender.send(message);
        System.out.println("---->邮件收到时间"+new Date());
    }
}
