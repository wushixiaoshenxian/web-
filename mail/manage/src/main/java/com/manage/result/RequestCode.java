package com.manage.result;


public enum RequestCode {
    SUCCESS(0, "操作成功"),
    ERROR(1, "操作失败"),
    SERVER_ERROR(500, "服务器异常")
    ;
    //自定义状态码
    private final int code;
    //自定义描述
    private final  String message;

    public int getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }

    RequestCode(int code, String msg) {
        this.code = code;
        this.message = msg;
    }
}
