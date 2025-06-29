import { HangmanWord } from '../types';

export const sampleContent = {
  python: {
    title: "Python Programming",
    description: "Learn Python concepts through interactive gameplay",
    emoji: "🐍",
    text: `Python is a high-level, interpreted programming language known for its simplicity and readability. It supports multiple programming paradigms including procedural, object-oriented, and functional programming.

Variables in Python are dynamically typed, meaning you don't need to declare their type explicitly. Python uses indentation to define code blocks instead of curly braces. Functions are defined using the def keyword, and classes use the class keyword.

Python has extensive built-in data structures including lists, tuples, dictionaries, and sets. List comprehensions provide a concise way to create lists. The language includes powerful libraries like NumPy for numerical computing, Pandas for data analysis, and Django for web development.

Exception handling in Python uses try-except blocks. Python supports inheritance, polymorphism, and encapsulation as core object-oriented principles. The language includes decorators for modifying function behavior and generators for memory-efficient iteration.

Python's standard library is comprehensive, including modules for regular expressions, file handling, networking, and database connectivity. The language supports lambda functions for creating anonymous functions and includes powerful debugging tools.`,
    words: {
      Easy: [
        {
          word: "LIST",
          question: "What data structure stores multiple items in a single variable?",
          hint: "It's ordered, changeable, and allows duplicate values",
          level: "Easy" as const
        },
        {
          word: "LOOP",
          question: "What programming construct repeats a block of code?",
          hint: "Common types include 'for' and 'while'",
          level: "Easy" as const
        },
        {
          word: "PRINT",
          question: "What function displays output to the console?",
          hint: "It's one of the first functions beginners learn",
          level: "Easy" as const
        },
        {
          word: "CLASS",
          question: "What keyword defines a blueprint for creating objects?",
          hint: "It's fundamental to object-oriented programming",
          level: "Easy" as const
        },
        {
          word: "TUPLE",
          question: "What immutable data structure stores ordered items?",
          hint: "Unlike lists, you cannot change its contents after creation",
          level: "Easy" as const
        },
        {
          word: "DICT",
          question: "What data structure stores key-value pairs?",
          hint: "Short for dictionary, uses curly braces",
          level: "Easy" as const
        },
        {
          word: "RANGE",
          question: "What function generates a sequence of numbers?",
          hint: "Commonly used with for loops",
          level: "Easy" as const
        },
        {
          word: "INPUT",
          question: "What function gets user input from the keyboard?",
          hint: "It always returns a string value",
          level: "Easy" as const
        },
        {
          word: "BREAK",
          question: "What keyword exits a loop prematurely?",
          hint: "Often used with conditional statements inside loops",
          level: "Easy" as const
        },
        {
          word: "IMPORT",
          question: "What keyword brings external modules into your program?",
          hint: "Essential for using libraries and packages",
          level: "Easy" as const
        },
        {
          word: "STRING",
          question: "What data type represents text in Python?",
          hint: "Enclosed in quotes, can be single or double",
          level: "Easy" as const
        },
        {
          word: "RETURN",
          question: "What keyword sends a value back from a function?",
          hint: "Functions without this keyword return None by default",
          level: "Easy" as const
        },
        {
          word: "INDENT",
          question: "What defines code blocks in Python instead of braces?",
          hint: "Python's unique way of structuring code",
          level: "Easy" as const
        },
        {
          word: "LAMBDA",
          question: "What keyword creates anonymous functions?",
          hint: "Used for short, simple functions in one line",
          level: "Easy" as const
        },
        {
          word: "GLOBAL",
          question: "What keyword accesses variables outside function scope?",
          hint: "Allows modification of variables defined outside functions",
          level: "Easy" as const
        }
      ],
      Medium: [
        {
          word: "EXCEPTION",
          question: "What occurs when Python encounters an error during execution?",
          hint: "Handled using try-except blocks",
          level: "Medium" as const
        },
        {
          word: "DECORATOR",
          question: "What modifies the behavior of functions or classes?",
          hint: "Uses the @ symbol before function definitions",
          level: "Medium" as const
        },
        {
          word: "GENERATOR",
          question: "What creates iterators using yield instead of return?",
          hint: "Memory-efficient way to create sequences",
          level: "Medium" as const
        },
        {
          word: "ITERATOR",
          question: "What object implements __iter__ and __next__ methods?",
          hint: "Can be used in for loops and with next() function",
          level: "Medium" as const
        },
        {
          word: "RECURSION",
          question: "What technique involves a function calling itself?",
          hint: "Useful for problems that can be broken into smaller subproblems",
          level: "Medium" as const
        },
        {
          word: "NAMESPACE",
          question: "What system maps names to objects in Python?",
          hint: "Prevents naming conflicts between different parts of code",
          level: "Medium" as const
        },
        {
          word: "PROPERTY",
          question: "What allows methods to be accessed like attributes?",
          hint: "Uses @property decorator for getter methods",
          level: "Medium" as const
        },
        {
          word: "CLOSURE",
          question: "What captures variables from an enclosing scope?",
          hint: "Inner functions that remember outer function variables",
          level: "Medium" as const
        },
        {
          word: "METACLASS",
          question: "What is a class whose instances are classes?",
          hint: "Controls how classes are created in Python",
          level: "Medium" as const
        },
        {
          word: "THREADING",
          question: "What allows concurrent execution of multiple tasks?",
          hint: "Python's approach to parallel processing",
          level: "Medium" as const
        },
        {
          word: "PICKLING",
          question: "What process serializes Python objects to binary format?",
          hint: "Used to save objects to files or send over networks",
          level: "Medium" as const
        },
        {
          word: "SLICING",
          question: "What technique extracts portions of sequences?",
          hint: "Uses colon notation like [start:end:step]",
          level: "Medium" as const
        },
        {
          word: "CONTEXT",
          question: "What manager handles resource allocation and cleanup?",
          hint: "Used with 'with' statements for file handling",
          level: "Medium" as const
        },
        {
          word: "MULTIPLE",
          question: "What type of inheritance allows a class to inherit from multiple parents?",
          hint: "Can lead to the diamond problem in inheritance hierarchies",
          level: "Medium" as const
        },
        {
          word: "ABSTRACT",
          question: "What type of class cannot be instantiated directly?",
          hint: "Serves as a blueprint for other classes to inherit from",
          level: "Medium" as const
        }
      ],
      Hard: [
        {
          word: "LIST COMPREHENSION",
          question: "What concise way creates lists using a single line of code?",
          hint: "Combines loops and conditionals in square brackets",
          level: "Hard" as const
        },
        {
          word: "MULTIPLE INHERITANCE",
          question: "What OOP feature allows a class to inherit from multiple parent classes?",
          hint: "Can create complex hierarchies and method resolution order issues",
          level: "Hard" as const
        },
        {
          word: "GARBAGE COLLECTION",
          question: "What automatic process frees up memory from unused objects?",
          hint: "Python uses reference counting and cycle detection",
          level: "Hard" as const
        },
        {
          word: "DUCK TYPING",
          question: "What principle focuses on object behavior rather than type?",
          hint: "If it walks like a duck and quacks like a duck, it's a duck",
          level: "Hard" as const
        },
        {
          word: "METHOD RESOLUTION ORDER",
          question: "What determines which method is called in multiple inheritance?",
          hint: "Python uses C3 linearization algorithm for this",
          level: "Hard" as const
        },
        {
          word: "GLOBAL INTERPRETER LOCK",
          question: "What prevents multiple threads from executing Python code simultaneously?",
          hint: "Often abbreviated as GIL, affects multithreading performance",
          level: "Hard" as const
        },
        {
          word: "CONTEXT MANAGER",
          question: "What protocol defines runtime context for executing code blocks?",
          hint: "Implements __enter__ and __exit__ methods",
          level: "Hard" as const
        },
        {
          word: "METACLASS PROGRAMMING",
          question: "What advanced technique involves classes that create other classes?",
          hint: "Classes are instances of metaclasses in Python",
          level: "Hard" as const
        },
        {
          word: "ASYNCHRONOUS PROGRAMMING",
          question: "What paradigm allows non-blocking execution of code?",
          hint: "Uses async/await keywords for concurrent operations",
          level: "Hard" as const
        },
        {
          word: "DESCRIPTOR PROTOCOL",
          question: "What mechanism controls attribute access in Python objects?",
          hint: "Implements __get__, __set__, and __delete__ methods",
          level: "Hard" as const
        },
        {
          word: "MONKEY PATCHING",
          question: "What technique dynamically modifies classes or modules at runtime?",
          hint: "Can change behavior of existing code without modifying source",
          level: "Hard" as const
        },
        {
          word: "WEAK REFERENCE",
          question: "What type of reference doesn't prevent garbage collection?",
          hint: "Useful for avoiding circular references and memory leaks",
          level: "Hard" as const
        },
        {
          word: "COROUTINE FUNCTION",
          question: "What special function can be paused and resumed during execution?",
          hint: "Defined with async def and called with await",
          level: "Hard" as const
        },
        {
          word: "ABSTRACT BASE CLASS",
          question: "What provides a way to define interfaces in Python?",
          hint: "Uses ABC module to enforce method implementation in subclasses",
          level: "Hard" as const
        },
        {
          word: "MEMORY VIEW OBJECT",
          question: "What provides access to internal data of objects without copying?",
          hint: "Efficient way to work with large binary data structures",
          level: "Hard" as const
        }
      ]
    }
  },
  electronics: {
    title: "Electronics Engineering",
    description: "Master electronics concepts through engaging puzzles",
    emoji: "⚡",
    text: `Electronics is the branch of physics and engineering dealing with the behavior and effects of electrons and electronic devices. It encompasses the design and application of circuits using active components like transistors, diodes, and integrated circuits.

Basic electronic components include resistors, capacitors, inductors, and semiconductors. Ohm's law describes the relationship between voltage, current, and resistance. Kirchhoff's laws govern current and voltage in electrical circuits.

Semiconductors are materials with electrical conductivity between conductors and insulators. Diodes allow current flow in one direction, while transistors can amplify signals or act as switches. Integrated circuits combine multiple components on a single chip.

Digital electronics uses binary logic with high and low voltage levels representing 1 and 0. Logic gates perform Boolean operations, and flip-flops store binary information. Microprocessors execute instructions to process data.

Analog electronics deals with continuous signals, using operational amplifiers for signal processing. Filters remove unwanted frequencies, and oscillators generate periodic waveforms. Power electronics manages electrical energy conversion and control.`,
    words: {
      Easy: [
        {
          word: "DIODE",
          question: "What component allows current to flow in only one direction?",
          hint: "Has an anode and cathode, commonly used for rectification",
          level: "Easy" as const
        },
        {
          word: "OHMS",
          question: "What is the unit of electrical resistance?",
          hint: "Named after a German physicist, symbol is Ω",
          level: "Easy" as const
        },
        {
          word: "VOLT",
          question: "What is the unit of electrical potential difference?",
          hint: "Named after Alessandro Volta, symbol is V",
          level: "Easy" as const
        },
        {
          word: "AMPERE",
          question: "What is the unit of electrical current?",
          hint: "Often shortened to 'amp', symbol is A",
          level: "Easy" as const
        },
        {
          word: "GROUND",
          question: "What is the reference point for voltage measurements?",
          hint: "Usually connected to earth or chassis",
          level: "Easy" as const
        },
        {
          word: "SWITCH",
          question: "What component controls the flow of current in a circuit?",
          hint: "Can be open or closed to break or complete a circuit",
          level: "Easy" as const
        },
        {
          word: "FUSE",
          question: "What safety device protects circuits from overcurrent?",
          hint: "Burns out when current exceeds its rating",
          level: "Easy" as const
        },
        {
          word: "WIRE",
          question: "What conducts electricity between components?",
          hint: "Usually made of copper and covered with insulation",
          level: "Easy" as const
        },
        {
          word: "POWER",
          question: "What is the rate of energy consumption measured in watts?",
          hint: "Calculated as voltage times current",
          level: "Easy" as const
        },
        {
          word: "SERIES",
          question: "What type of circuit has components connected end-to-end?",
          hint: "Current is the same through all components",
          level: "Easy" as const
        },
        {
          word: "CHARGE",
          question: "What fundamental property of matter creates electric fields?",
          hint: "Can be positive or negative, measured in coulombs",
          level: "Easy" as const
        },
        {
          word: "SIGNAL",
          question: "What carries information in electronic systems?",
          hint: "Can be analog or digital, varies with time",
          level: "Easy" as const
        },
        {
          word: "GROUND",
          question: "What provides a return path for current?",
          hint: "Common reference point in circuits",
          level: "Easy" as const
        },
        {
          word: "LOAD",
          question: "What component consumes power in a circuit?",
          hint: "Examples include motors, lights, and speakers",
          level: "Easy" as const
        },
        {
          word: "SHORT",
          question: "What unwanted low-resistance path can damage circuits?",
          hint: "Causes excessive current flow and can blow fuses",
          level: "Easy" as const
        }
      ],
      Medium: [
        {
          word: "RESISTOR",
          question: "What component opposes the flow of electric current?",
          hint: "Color bands indicate its value in ohms",
          level: "Medium" as const
        },
        {
          word: "CAPACITOR",
          question: "What component stores electrical energy in an electric field?",
          hint: "Blocks DC but allows AC to pass through",
          level: "Medium" as const
        },
        {
          word: "INDUCTOR",
          question: "What component stores energy in a magnetic field?",
          hint: "Opposes changes in current flow",
          level: "Medium" as const
        },
        {
          word: "TRANSISTOR",
          question: "What three-terminal device can amplify or switch signals?",
          hint: "Types include BJT and MOSFET",
          level: "Medium" as const
        },
        {
          word: "FREQUENCY",
          question: "What measures how many cycles occur per second?",
          hint: "Measured in Hertz, important for AC circuits",
          level: "Medium" as const
        },
        {
          word: "IMPEDANCE",
          question: "What is the total opposition to AC current flow?",
          hint: "Combines resistance and reactance",
          level: "Medium" as const
        },
        {
          word: "RECTIFIER",
          question: "What circuit converts AC to DC?",
          hint: "Uses diodes to allow current flow in one direction",
          level: "Medium" as const
        },
        {
          word: "AMPLIFIER",
          question: "What circuit increases the amplitude of signals?",
          hint: "Common types include operational amplifiers",
          level: "Medium" as const
        },
        {
          word: "OSCILLATOR",
          question: "What circuit generates periodic waveforms?",
          hint: "Creates sine waves, square waves, or other patterns",
          level: "Medium" as const
        },
        {
          word: "FEEDBACK",
          question: "What technique returns output signal to the input?",
          hint: "Can be positive or negative, affects stability",
          level: "Medium" as const
        },
        {
          word: "BANDWIDTH",
          question: "What range of frequencies can a system handle?",
          hint: "Difference between upper and lower frequency limits",
          level: "Medium" as const
        },
        {
          word: "RESONANCE",
          question: "What occurs when reactive components cancel each other?",
          hint: "Happens at a specific frequency in LC circuits",
          level: "Medium" as const
        },
        {
          word: "MODULATION",
          question: "What process varies a carrier signal with information?",
          hint: "Types include AM, FM, and digital modulation",
          level: "Medium" as const
        },
        {
          word: "THRESHOLD",
          question: "What minimum input level triggers a digital response?",
          hint: "Important for logic gates and comparators",
          level: "Medium" as const
        },
        {
          word: "SATURATION",
          question: "What state occurs when a transistor is fully turned on?",
          hint: "Collector-emitter voltage is at minimum",
          level: "Medium" as const
        }
      ],
      Hard: [
        {
          word: "OPERATIONAL AMPLIFIER",
          question: "What high-gain differential amplifier is fundamental to analog circuits?",
          hint: "Often called op-amp, has inverting and non-inverting inputs",
          level: "Hard" as const
        },
        {
          word: "PHASE LOCKED LOOP",
          question: "What control system locks output phase to input reference?",
          hint: "Commonly abbreviated as PLL, used in frequency synthesis",
          level: "Hard" as const
        },
        {
          word: "FIELD EFFECT TRANSISTOR",
          question: "What voltage-controlled device uses electric field to control current?",
          hint: "Types include JFET and MOSFET, high input impedance",
          level: "Hard" as const
        },
        {
          word: "ANALOG TO DIGITAL",
          question: "What conversion process transforms continuous signals to discrete values?",
          hint: "Essential for digital signal processing systems",
          level: "Hard" as const
        },
        {
          word: "ELECTROMAGNETIC INTERFERENCE",
          question: "What unwanted disturbance affects electronic equipment operation?",
          hint: "Often abbreviated as EMI, requires shielding and filtering",
          level: "Hard" as const
        },
        {
          word: "SWITCHING POWER SUPPLY",
          question: "What efficient power converter uses high-frequency switching?",
          hint: "More efficient than linear regulators, generates less heat",
          level: "Hard" as const
        },
        {
          word: "DIGITAL SIGNAL PROCESSOR",
          question: "What specialized microprocessor optimizes digital signal processing?",
          hint: "Abbreviated as DSP, used in audio and communication systems",
          level: "Hard" as const
        },
        {
          word: "COMPLEMENTARY METAL OXIDE",
          question: "What semiconductor technology uses both NMOS and PMOS transistors?",
          hint: "CMOS technology, low power consumption when static",
          level: "Hard" as const
        },
        {
          word: "VOLTAGE CONTROLLED OSCILLATOR",
          question: "What circuit generates frequency proportional to input voltage?",
          hint: "Abbreviated as VCO, key component in PLLs",
          level: "Hard" as const
        },
        {
          word: "SURFACE MOUNT TECHNOLOGY",
          question: "What assembly method mounts components directly on PCB surface?",
          hint: "SMT allows smaller, denser circuit boards",
          level: "Hard" as const
        },
        {
          word: "PRINTED CIRCUIT BOARD",
          question: "What substrate mechanically supports and electrically connects components?",
          hint: "PCB uses conductive tracks etched from copper sheets",
          level: "Hard" as const
        },
        {
          word: "ELECTROSTATIC DISCHARGE",
          question: "What sudden flow of electricity can damage sensitive components?",
          hint: "ESD protection is crucial in semiconductor handling",
          level: "Hard" as const
        },
        {
          word: "RADIO FREQUENCY IDENTIFICATION",
          question: "What wireless technology uses electromagnetic fields for identification?",
          hint: "RFID systems consist of tags and readers",
          level: "Hard" as const
        },
        {
          word: "PULSE WIDTH MODULATION",
          question: "What technique varies duty cycle to control average power?",
          hint: "PWM is efficient for motor control and power regulation",
          level: "Hard" as const
        },
        {
          word: "INTEGRATED CIRCUIT DESIGN",
          question: "What process creates complex electronic systems on semiconductor chips?",
          hint: "Involves layout, fabrication, and testing of microchips",
          level: "Hard" as const
        }
      ]
    }
  }
};

export type SampleType = keyof typeof sampleContent;