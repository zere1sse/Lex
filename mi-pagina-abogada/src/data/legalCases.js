// src/data/legalCases.js

const legalCases = [
  // --- CASO 1: Robo con Fuerza en las Cosas (expandido) ---
  {
    id: 'case-1',
    title: 'Caso: Robo con Fuerza en las Cosas (Fractura)',
    description: 'Un individuo, Juan Pérez, ingresa a una casa ajena durante la noche, rompiendo una ventana con una piedra. Una vez dentro, sustrae joyas y aparatos electrónicos. Al huir, es sorprendido por un vecino que lo reconoce.',
    initialQuestion: 'Considerando los elementos, ¿cómo clasificaría el delito principal cometido por Juan Pérez?',
    stages: {
      'start': { // <-- Asegúrate de que esta etapa 'start' exista
        question: 'Considerando los elementos, ¿cómo clasificaría el delito principal cometido por Juan Pérez?',
        options: [ // <-- Y que 'options' sea un array válido aquí
          { text: 'Hurto simple', nextStage: 'hurto-simple-result' },
          { text: 'Allanamiento de morada sin robo', nextStage: 'allanamiento-result' },
          { text: 'Robo con fuerza en las cosas', nextStage: 'robo-fuerza-correct' },
          { text: 'Robo con violencia o intimidación', nextStage: 'robo-violencia-result' }
        ]
      },
      'hurto-simple-result': {
        text: 'Respuesta Incorrecta: El hurto simple no implica el uso de fuerza para acceder al lugar. Aquí hubo fractura de una ventana.',
        type: 'result',
        isCorrect: false,
        feedback: 'El uso de fuerza para entrar es un elemento diferenciador clave entre hurto y robo.'
      },
      'allanamiento-result': {
        text: 'Respuesta Incorrecta: Si bien hubo allanamiento, el objetivo principal fue la sustracción de bienes mediante fuerza, lo que convierte el hecho en un delito más grave contra la propiedad.',
        type: 'result',
        isCorrect: false,
        feedback: 'El allanamiento queda absorbido por el robo cuando es un medio para cometer este último.'
      },
      'robo-violencia-result': {
        text: 'Respuesta Incorrecta: No se describe violencia o intimidación sobre personas, solo fuerza en los objetos (ventana).',
        type: 'result',
        isCorrect: false,
        feedback: 'La distinción entre robo con fuerza y robo con violencia reside en el sujeto de la fuerza: si es sobre cosas o sobre personas.'
      },
      'robo-fuerza-correct': {
        text: 'Respuesta Correcta: Es un Robo con Fuerza en las Cosas. La fractura de la ventana es una de las formas de fuerza tipificadas para este delito.',
        type: 'branched-question', // Se ramifica a otra pregunta
        isCorrect: true,
        feedback: 'La fuerza ejercida para entrar al lugar donde están los objetos, como la fractura de una ventana, es el elemento distintivo.',
        nextStage: 'consecuencia-juridica'
      },
      'consecuencia-juridica': {
        question: 'Tras ser detenido, ¿cuál es la principal consecuencia jurídica que Juan Pérez enfrentaría en cuanto a la acción penal?',
        options: [ // <-- Y aquí también deben haber 'options'
          { text: 'Un juicio de faltas por daños a la propiedad.', nextStage: 'consecuencia-faltas-result' },
          { text: 'Un proceso penal por un delito contra la propiedad.', nextStage: 'consecuencia-penal-correct' },
          { text: 'Una demanda civil por los daños materiales.', nextStage: 'consecuencia-civil-result' }
        ]
      },
      'consecuencia-faltas-result': {
        text: 'Respuesta Incorrecta: El robo con fuerza es un delito mayor, no una simple falta, debido a la gravedad de la conducta.',
        type: 'result',
        isCorrect: false
      },
      'consecuencia-civil-result': {
        text: 'Respuesta Incorrecta: Aunque puede haber una acción civil para la reparación del daño, la consecuencia PRINCIPAL de un delito es la acción penal.',
        type: 'result',
        isCorrect: false
      },
      'consecuencia-penal-correct': {
        text: 'Respuesta Correcta: Enfrentaría un proceso penal. El Ministerio Público investigará el delito y buscará una pena privativa de libertad, además de la posible reparación del daño.',
        type: 'result',
        isCorrect: true,
        feedback: 'Los delitos, especialmente los graves como el robo, son perseguidos penalmente por el Estado.'
      }
    }
  },

  // --- CASO 2: Incumplimiento de Contrato de Arrendamiento ---
  {
    id: 'case-2',
    title: 'Caso: Incumplimiento de Contrato de Arrendamiento',
    description: 'Sofía arrendó un departamento a Pedro por un año. Han pasado 3 meses y Pedro no ha pagado el arriendo ni los gastos comunes, a pesar de las reiteradas notificaciones de Sofía.',
    initialQuestion: '¿Qué tipo de acción legal inicial debería considerar Sofía contra Pedro?',
    stages: {
      'start': {
        question: '¿Qué tipo de acción legal inicial debería considerar Sofía contra Pedro?',
        options: [
          { text: 'Una denuncia penal por estafa', nextStage: 'estafa-result' },
          { text: 'Una demanda civil de terminación de contrato y cobro de rentas', nextStage: 'demanda-civil-arriendo-correct' },
          { text: 'Un recurso de protección', nextStage: 'recurso-proteccion-result' }
        ]
      },
      'estafa-result': {
        text: 'Respuesta Incorrecta: El incumplimiento de un contrato de arriendo es un asunto civil, no necesariamente una estafa, que requiere dolo específico.',
        type: 'result',
        isCorrect: false,
        feedback: 'La estafa implica un engaño para inducir a error y obtener un beneficio ilícito, lo cual no es el elemento principal aquí.'
      },
      'recurso-proteccion-result': {
        text: 'Respuesta Incorrecta: El recurso de protección es una acción constitucional para proteger derechos fundamentales, no para cobrar deudas de arriendo.',
        type: 'result',
        isCorrect: false,
        feedback: 'El recurso de protección es una vía excepcional para vulneraciones de garantías constitucionales, no para controversias contractuales.'
      },
      'demanda-civil-arriendo-correct': {
        text: 'Respuesta Correcta: Una demanda civil de terminación de contrato de arrendamiento por no pago de rentas y cobro de las mismas. Este es el camino legal adecuado en esta situación.',
        type: 'branched-question',
        isCorrect: true,
        feedback: 'Los conflictos de arriendo y el cobro de deudas contractuales son competencia de los tribunales civiles.',
        nextStage: 'via-ejecutiva'
      },
      'via-ejecutiva': {
        question: 'Si el contrato de arriendo de Sofía y Pedro estaba firmado ante notario, ¿qué ventaja procesal podría tener Sofía para el cobro de las rentas adeudadas?',
        options: [
          { text: 'Ninguna ventaja especial, el proceso es el mismo.', nextStage: 'via-ejecutiva-no-ventaja' },
          { text: 'Puede solicitar una medida prejudicial de embargo.', nextStage: 'via-ejecutiva-embargo' },
          { text: 'Podría iniciar un juicio ejecutivo para el cobro.', nextStage: 'via-ejecutiva-correct' }
        ]
      },
      'via-ejecutiva-no-ventaja': {
        text: 'Respuesta Incorrecta: Un contrato notarial sí confiere una ventaja importante.',
        type: 'result',
        isCorrect: false
      },
      'via-ejecutiva-embargo': {
        text: 'Respuesta Incorrecta: Si bien el embargo es una medida, la ventaja del contrato notarial es que permite una vía procesal más directa, no solo una medida prejudicial.',
        type: 'result',
        isCorrect: false
      },
      'via-ejecutiva-correct': {
        text: 'Respuesta Correcta: Un contrato de arriendo autorizado por notario tiene mérito ejecutivo, lo que permite a Sofía iniciar directamente un "Juicio Ejecutivo" para el cobro de las rentas, un proceso más rápido que un juicio ordinario.',
        type: 'result',
        isCorrect: true,
        feedback: 'El mérito ejecutivo simplifica y acelera el proceso de cobro de deudas documentadas formalmente.'
      }
    }
  },

  // --- CASO 3: Despido Injustificado ---
  {
    id: 'case-3',
    title: 'Caso: Despido Injustificado y Cobro de Prestaciones',
    description: 'Marta trabajaba en una empresa y fue despedida verbalmente por su jefe sin causa justificada y sin recibir su carta de despido ni el pago de sus indemnizaciones correspondientes.',
    initialQuestion: '¿Qué plazo tiene Marta para reclamar legalmente su despido desde la fecha en que fue comunicada verbalmente?',
    stages: {
      'start': {
        question: '¿Qué plazo tiene Marta para reclamar legalmente su despido desde la fecha en que fue comunicada verbalmente?',
        options: [
          { text: '60 días hábiles', nextStage: 'despido-plazo-correct' },
          { text: '30 días corridos', nextStage: 'despido-plazo-incorrect-1' },
          { text: '90 días corridos', nextStage: 'despido-plazo-incorrect-2' }
        ]
      },
      'despido-plazo-incorrect-1': {
        text: 'Respuesta Incorrecta: El plazo para reclamar un despido es más largo y se cuenta en días hábiles.',
        type: 'result',
        isCorrect: false,
        feedback: 'Es fundamental conocer los plazos exactos en materia laboral, ya que son perentorios.'
      },
      'despido-plazo-incorrect-2': {
        text: 'Respuesta Incorrecta: 90 días corridos es el plazo para demandar por nulidad del despido si no se pagan las cotizaciones previsionales, pero el plazo inicial para el despido es diferente.',
        type: 'result',
        isCorrect: false,
        feedback: 'Existen distintos plazos según la acción laboral que se ejerza.'
      },
      'despido-plazo-correct': {
        text: 'Respuesta Correcta: Marta tiene un plazo de 60 días hábiles desde la separación para interponer una demanda por despido injustificado, indebido o improcedente.',
        type: 'branched-question',
        isCorrect: true,
        feedback: 'Este plazo se suspende si se interpone un reclamo ante la Inspección del Trabajo, pudiendo extenderse hasta 90 días hábiles.',
        nextStage: 'documentacion-despido'
      },
      'documentacion-despido': {
        question: 'Además del despido verbal, ¿qué otro incumplimiento clave de la empresa ayudaría a Marta en su demanda?',
        options: [
          { text: 'La falta de entrega del contrato de trabajo.', nextStage: 'documentacion-contrato-incorrect' },
          { text: 'La falta de entrega de la carta de despido en el plazo legal.', nextStage: 'documentacion-carta-correct' },
          { text: 'Que no le hayan dado una fiesta de despedida.', nextStage: 'documentacion-fiesta-incorrect' }
        ]
      },
      'documentacion-contrato-incorrect': {
        text: 'Respuesta Incorrecta: Si bien es una infracción, la falta de contrato no es el incumplimiento más directo relacionado con la ilegalidad del despido en este caso.',
        type: 'result',
        isCorrect: false
      },
      'documentacion-fiesta-incorrect': {
        text: 'Respuesta Incorrecta: No es un requisito legal y no afecta la legalidad del despido.',
        type: 'result',
        isCorrect: false
      },
      'documentacion-carta-correct': {
        text: 'Respuesta Correcta: La empresa está obligada a entregar la carta de despido con la causa legal y los hechos en un plazo de 3 días desde la separación. Su no entrega o entrega fuera de plazo puede hacer que el despido sea considerado injustificado.',
        type: 'result',
        isCorrect: true,
        feedback: 'La carta de despido es un requisito formal esencial que protege al trabajador.'
      }
    }
  },

  // --- CASO 4: Divorcio de Mutuo Acuerdo ---
  {
    id: 'case-4',
    title: 'Caso: Divorcio de Mutuo Acuerdo',
    description: 'Ana y Carlos están casados hace 10 años y llevan 2 años separados de hecho. Ambos están de acuerdo en divorciarse y no tienen hijos menores ni bienes que liquidar en este momento.',
    initialQuestion: 'Considerando que ambos están de acuerdo, ¿qué tipo de divorcio podrían solicitar?',
    stages: {
      'start': {
        question: 'Considerando que ambos están de acuerdo, ¿qué tipo de divorcio podrían solicitar?',
        options: [
          { text: 'Divorcio culposo', nextStage: 'divorcio-culposo-result' },
          { text: 'Divorcio unilateral', nextStage: 'divorcio-unilateral-result' },
          { text: 'Divorcio de mutuo acuerdo', nextStage: 'divorcio-mutuo-acuerdo-correct' }
        ]
      },
      'divorcio-culposo-result': {
        text: 'Respuesta Incorrecta: El divorcio culposo se basa en la falta grave de uno de los cónyuges, y aquí hay acuerdo mutuo.',
        type: 'result',
        isCorrect: false,
        feedback: 'El divorcio culposo requiere probar una infracción grave a los deberes del matrimonio.'
      },
      'divorcio-unilateral-result': {
        text: 'Respuesta Incorrecta: El divorcio unilateral es solicitado por uno solo de los cónyuges. En este caso, hay mutuo acuerdo.',
        type: 'result',
        isCorrect: false,
        feedback: 'La voluntad de ambos cónyuges es el factor principal para diferenciar los tipos de divorcio.'
      },
      'divorcio-mutuo-acuerdo-correct': {
        text: 'Respuesta Correcta: Pueden solicitar un Divorcio de Mutuo Acuerdo. Al haber acuerdo y más de un año de cese de convivencia, cumplen los requisitos.',
        type: 'branched-question',
        isCorrect: true,
        feedback: 'El mutuo acuerdo y el plazo de cese de convivencia son las bases de este tipo de divorcio.',
        nextStage: 'requisito-principal'
      },
      'requisito-principal': {
        question: '¿Cuál es el requisito de tiempo principal que deben cumplir para el Divorcio de Mutuo Acuerdo?',
        options: [
          { text: 'Haber estado separados de hecho por al menos 1 año.', nextStage: 'requisito-tiempo-correct' },
          { text: 'Haber estado separados de hecho por al menos 3 años.', nextStage: 'requisito-tiempo-incorrect' },
          { text: 'No existe un plazo mínimo de separación.', nextStage: 'requisito-tiempo-no-plazo' }
        ]
      },
      'requisito-tiempo-incorrect': {
        text: 'Respuesta Incorrecta: 3 años de separación es el plazo para el divorcio unilateral, no el de mutuo acuerdo.',
        type: 'result',
        isCorrect: false
      },
      'requisito-tiempo-no-plazo': {
        text: 'Respuesta Incorrecta: Siempre se requiere un plazo de cese de convivencia para el divorcio en Chile.',
        type: 'result',
        isCorrect: false
      },
      'requisito-tiempo-correct': {
        text: 'Respuesta Correcta: Para el divorcio de mutuo acuerdo, se requiere un cese efectivo de la convivencia por un plazo de al menos 1 año.',
        type: 'result',
        isCorrect: true,
        feedback: 'El cese de convivencia es un requisito fundamental en todos los tipos de divorcio en Chile.'
      }
    }
  },

  // --- CASO 5: Compraventa de Inmueble (Registro) ---
  {
    id: 'case-5',
    title: 'Caso: Problemas en la Compraventa de un Inmueble',
    description: 'Pedro ha comprado un departamento y ha firmado la escritura de compraventa ante notario. Sin embargo, no ha realizado ninguna otra gestión. Días después, se entera de que el vendedor lo ha vendido a otra persona que sí inscribió la propiedad a su nombre en el Conservador de Bienes Raíces.',
    initialQuestion: '¿Qué paso legal fundamental omitió Pedro para consolidar su derecho de propiedad sobre el departamento?',
    stages: {
      'start': {
        question: '¿Qué paso legal fundamental omitió Pedro para consolidar su derecho de propiedad sobre el departamento?',
        options: [
          { text: 'Pagar el precio de la venta.', nextStage: 'pago-precio-result' },
          { text: 'Inscribir la escritura en el Conservador de Bienes Raíces.', nextStage: 'inscripcion-cbr-correct' },
          { text: 'Solicitar un certificado de deuda al vendedor.', nextStage: 'deuda-vendedor-result' }
        ]
      },
      'pago-precio-result': {
        text: 'Respuesta Incorrecta: El pago del precio es una obligación del comprador, pero no es el acto que transfiere el dominio.',
        type: 'result',
        isCorrect: false,
        feedback: 'En la compraventa, el contrato (escritura) y la tradición (inscripción) son actos distintos y ambos necesarios.'
      },
      'deuda-vendedor-result': {
        text: 'Respuesta Incorrecta: Solicitar un certificado de deuda es una buena práctica de precaución, pero no es un paso que transfiera la propiedad.',
        type: 'result',
        isCorrect: false
      },
      'inscripcion-cbr-correct': {
        text: 'Respuesta Correcta: La inscripción de la escritura en el Conservador de Bienes Raíces es el acto jurídico llamado "tradición" en Chile, y es lo que transfiere el dominio de un inmueble. Sin ella, Pedro solo tiene un derecho a la cosa, no sobre la cosa.',
        type: 'branched-question',
        isCorrect: true,
        feedback: 'La inscripción es el modo de adquirir el dominio de bienes raíces y lo hace oponible a terceros.',
        nextStage: 'quien-es-propietario'
      },
      'quien-es-propietario': {
        question: 'En esta situación, ¿quién es legalmente el propietario del departamento, Pedro o el segundo comprador que sí inscribió?',
        options: [
          { text: 'Pedro, porque firmó la escritura primero.', nextStage: 'propietario-pedro-incorrect' },
          { text: 'El segundo comprador, porque inscribió la propiedad.', nextStage: 'propietario-segundo-correct' },
          { text: 'Nadie, hasta que un juez lo decida.', nextStage: 'propietario-juez-result' }
        ]
      },
      'propietario-pedro-incorrect': {
        text: 'Respuesta Incorrecta: Aunque Pedro firmó primero, la escritura por sí sola no transfiere el dominio del inmueble. Necesita la inscripción.',
        type: 'result',
        isCorrect: false
      },
      'propietario-juez-result': {
        text: 'Respuesta Incorrecta: La ley establece claramente quién es el propietario en estos casos, sin necesidad de un juicio inicial para determinarlo.',
        type: 'result',
        isCorrect: false
      },
      'propietario-segundo-correct': {
        text: 'Respuesta Correcta: El segundo comprador es el propietario legal, ya que la inscripción en el Conservador de Bienes Raíces es la que perfecciona la tradición y le otorga el dominio real del inmueble. Pedro solo tendría una acción personal contra el vendedor por incumplimiento de contrato.',
        type: 'result',
        isCorrect: true,
        feedback: 'En bienes raíces, "quien primero inscribe, es el dueño". La inscripción es la publicidad legal y el medio para oponer el dominio a terceros.'
      }
    }
  }
];

export default legalCases;