package com.manage.result;

import java.time.LocalDateTime;

public class ResultData <T> {
    //获取当前Time时间
    private LocalDateTime localDateTime2 = LocalDateTime.now();
    //返回状态码
    private Integer status;
    //返回消息
    private String message;
    //返回数据
    private T data;
    //Success结果
    public static  <T> ResultData<T> success(T data){
        ResultData<T> resultData=new ResultData<>();
        resultData.setStatus(RequestCode.SUCCESS.getCode());
        resultData.setMessage(RequestCode.SUCCESS.getMessage());
        resultData.setData(data);
        return resultData;
    }
    //Fail结果
    public static <T> ResultData<T> fail(int code, String message) {
        ResultData<T> resultData = new ResultData<>();
        resultData.setStatus(code);
        resultData.setMessage(message);
        return resultData;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public void setLocalDateTime2(LocalDateTime localDateTime2) {
        this.localDateTime2 = localDateTime2;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setData(T data) {
        this.data = data;
    }
}

