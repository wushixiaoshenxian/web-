package com.manage.mapper;

import com.manage.pojo.LeaveMessage;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface ManageMapper {
    //根据用户id查询所有待发邮件信息
    List<LeaveMessage> queryByIdList(int id);
}
