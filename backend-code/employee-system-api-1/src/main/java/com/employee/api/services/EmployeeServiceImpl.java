package com.employee.api.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import com.employee.api.entity.EmployeeEntity;
import com.employee.api.model.Employee;
import com.employee.api.repository.EmployeeRepository;

@Service
public class EmployeeServiceImpl implements EmployeeService {

	private EmployeeRepository employeeRepository;
	
	public  EmployeeServiceImpl(EmployeeRepository employeeRepository) {
		this.employeeRepository = employeeRepository;
	}
	
	@Override
	public Employee createEmployee(Employee employee) {
		EmployeeEntity employeeEntity = new EmployeeEntity();
		
		BeanUtils.copyProperties(employee, employeeEntity);
		employeeRepository.save(employeeEntity);
		return employee;
	}

	@Override
	public List<Employee> getAllEmployees() {
		List<EmployeeEntity> employeeEntities = employeeRepository.findAll();
		
		List<Employee> employees = employeeEntities
				.stream()
				.map(emp -> new Employee(
						emp.getId(),
						emp.getFirstName(),
						emp.getLastName(),
						emp.getEmailId(),
						emp.getMobileNo(),
						emp.getDepartment(),
						emp.getSalary()
						))
				.collect(Collectors.toList());
		return employees;
	}

	@Override
	public boolean deleteEmployee(Long id) {
		EmployeeEntity employee = employeeRepository.findById(id).get();
		employeeRepository.delete(employee);
		return true;
	}

	@Override
	public Employee getEmployeeById(Long id) {
		EmployeeEntity employeeEntity = employeeRepository.findById(id).get();
		Employee employee = new Employee();
		BeanUtils.copyProperties(employeeEntity, employee);
		return employee;
	}

	@Override
	public Employee updateEmployee(Long id, Employee employee) {
		EmployeeEntity employeeEntity = employeeRepository.findById(id).get();
		employeeEntity.setFirstName(employee.getFirstName());
		employeeEntity.setLastName(employee.getLastName());
		employeeEntity.setMobileNo(employee.getMobileNo());
		employeeEntity.setEmailId(employee.getEmailId());
		employeeEntity.setDepartment(employee.getDepartment());
		employeeEntity.setSalary(employee.getSalary());
		
		employeeRepository.save(employeeEntity);
		return employee;
	}
	
	
	
	
	
}
