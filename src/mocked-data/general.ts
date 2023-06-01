const paginationOptions = [
    { value: '10', label: '10' },
    { value: '15', label: '15' },
    { value: '20', label: '20' },
]

const profilesSample = [
    { value: 'direcao/coordenacao', label: 'Direção/Coordenação' },
    { value: 'professor', label: 'Professor' }
]

const statusSample = [
    { value: 'ativo', label: 'Ativo' },
    { value: 'inativo', label: 'Inativo' },
]

const usersSample = [
    {
        name: 'Antônio Carlos Ribeiro',
        email: 'antonio.c@escolaxyz.com.br',
        cpf: 12345678,
        profile: 'Direção/Coordenação',
        status: 'Ativo'
    },
    {
        name: 'Alice Dias',
        email: 'alice.d@escolaxyz.com.br',
        cpf: 12345678,
        profile: 'Direção/Coordenação',
        status: 'Ativo'
    },
];

export {
    paginationOptions,
    profilesSample,
    statusSample,
    usersSample
}