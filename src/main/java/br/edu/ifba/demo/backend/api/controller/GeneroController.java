package br.edu.ifba.demo.backend.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.edu.ifba.demo.backend.api.repository.GeneroRepository;
import br.edu.ifba.demo.backend.api.model.GeneroModel;

@RestController
@RequestMapping("/genero")
public class GeneroController {

    @Autowired
    private GeneroRepository generoRepository;

    @GetMapping("/listall")
    public List<GeneroModel> listall() {
        return generoRepository.findAll();
    }
}