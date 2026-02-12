
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Department
 * 
 */
export type Department = $Result.DefaultSelection<Prisma.$DepartmentPayload>
/**
 * Model Course
 * 
 */
export type Course = $Result.DefaultSelection<Prisma.$CoursePayload>
/**
 * Model DiscussionGroup
 * 
 */
export type DiscussionGroup = $Result.DefaultSelection<Prisma.$DiscussionGroupPayload>
/**
 * Model Section
 * 
 */
export type Section = $Result.DefaultSelection<Prisma.$SectionPayload>
/**
 * Model Meeting
 * 
 */
export type Meeting = $Result.DefaultSelection<Prisma.$MeetingPayload>
/**
 * Model Instructor
 * 
 */
export type Instructor = $Result.DefaultSelection<Prisma.$InstructorPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Day: {
  M: 'M',
  Tu: 'Tu',
  W: 'W',
  Th: 'Th',
  F: 'F',
  Sa: 'Sa',
  Su: 'Su',
  TBA: 'TBA'
};

export type Day = (typeof Day)[keyof typeof Day]

}

export type Day = $Enums.Day

export const Day: typeof $Enums.Day

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Departments
 * const departments = await prisma.department.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Departments
   * const departments = await prisma.department.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.department`: Exposes CRUD operations for the **Department** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Departments
    * const departments = await prisma.department.findMany()
    * ```
    */
  get department(): Prisma.DepartmentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.course`: Exposes CRUD operations for the **Course** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Courses
    * const courses = await prisma.course.findMany()
    * ```
    */
  get course(): Prisma.CourseDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.discussionGroup`: Exposes CRUD operations for the **DiscussionGroup** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DiscussionGroups
    * const discussionGroups = await prisma.discussionGroup.findMany()
    * ```
    */
  get discussionGroup(): Prisma.DiscussionGroupDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.section`: Exposes CRUD operations for the **Section** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sections
    * const sections = await prisma.section.findMany()
    * ```
    */
  get section(): Prisma.SectionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.meeting`: Exposes CRUD operations for the **Meeting** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Meetings
    * const meetings = await prisma.meeting.findMany()
    * ```
    */
  get meeting(): Prisma.MeetingDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.instructor`: Exposes CRUD operations for the **Instructor** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Instructors
    * const instructors = await prisma.instructor.findMany()
    * ```
    */
  get instructor(): Prisma.InstructorDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.2.0
   * Query Engine version: 0c8ef2ce45c83248ab3df073180d5eda9e8be7a3
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Department: 'Department',
    Course: 'Course',
    DiscussionGroup: 'DiscussionGroup',
    Section: 'Section',
    Meeting: 'Meeting',
    Instructor: 'Instructor'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "department" | "course" | "discussionGroup" | "section" | "meeting" | "instructor"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Department: {
        payload: Prisma.$DepartmentPayload<ExtArgs>
        fields: Prisma.DepartmentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DepartmentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DepartmentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DepartmentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DepartmentPayload>
          }
          findFirst: {
            args: Prisma.DepartmentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DepartmentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DepartmentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DepartmentPayload>
          }
          findMany: {
            args: Prisma.DepartmentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DepartmentPayload>[]
          }
          create: {
            args: Prisma.DepartmentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DepartmentPayload>
          }
          createMany: {
            args: Prisma.DepartmentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DepartmentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DepartmentPayload>[]
          }
          delete: {
            args: Prisma.DepartmentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DepartmentPayload>
          }
          update: {
            args: Prisma.DepartmentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DepartmentPayload>
          }
          deleteMany: {
            args: Prisma.DepartmentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DepartmentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DepartmentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DepartmentPayload>[]
          }
          upsert: {
            args: Prisma.DepartmentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DepartmentPayload>
          }
          aggregate: {
            args: Prisma.DepartmentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDepartment>
          }
          groupBy: {
            args: Prisma.DepartmentGroupByArgs<ExtArgs>
            result: $Utils.Optional<DepartmentGroupByOutputType>[]
          }
          count: {
            args: Prisma.DepartmentCountArgs<ExtArgs>
            result: $Utils.Optional<DepartmentCountAggregateOutputType> | number
          }
        }
      }
      Course: {
        payload: Prisma.$CoursePayload<ExtArgs>
        fields: Prisma.CourseFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CourseFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CourseFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>
          }
          findFirst: {
            args: Prisma.CourseFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CourseFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>
          }
          findMany: {
            args: Prisma.CourseFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>[]
          }
          create: {
            args: Prisma.CourseCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>
          }
          createMany: {
            args: Prisma.CourseCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CourseCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>[]
          }
          delete: {
            args: Prisma.CourseDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>
          }
          update: {
            args: Prisma.CourseUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>
          }
          deleteMany: {
            args: Prisma.CourseDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CourseUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CourseUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>[]
          }
          upsert: {
            args: Prisma.CourseUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>
          }
          aggregate: {
            args: Prisma.CourseAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCourse>
          }
          groupBy: {
            args: Prisma.CourseGroupByArgs<ExtArgs>
            result: $Utils.Optional<CourseGroupByOutputType>[]
          }
          count: {
            args: Prisma.CourseCountArgs<ExtArgs>
            result: $Utils.Optional<CourseCountAggregateOutputType> | number
          }
        }
      }
      DiscussionGroup: {
        payload: Prisma.$DiscussionGroupPayload<ExtArgs>
        fields: Prisma.DiscussionGroupFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DiscussionGroupFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DiscussionGroupPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DiscussionGroupFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DiscussionGroupPayload>
          }
          findFirst: {
            args: Prisma.DiscussionGroupFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DiscussionGroupPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DiscussionGroupFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DiscussionGroupPayload>
          }
          findMany: {
            args: Prisma.DiscussionGroupFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DiscussionGroupPayload>[]
          }
          create: {
            args: Prisma.DiscussionGroupCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DiscussionGroupPayload>
          }
          createMany: {
            args: Prisma.DiscussionGroupCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DiscussionGroupCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DiscussionGroupPayload>[]
          }
          delete: {
            args: Prisma.DiscussionGroupDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DiscussionGroupPayload>
          }
          update: {
            args: Prisma.DiscussionGroupUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DiscussionGroupPayload>
          }
          deleteMany: {
            args: Prisma.DiscussionGroupDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DiscussionGroupUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DiscussionGroupUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DiscussionGroupPayload>[]
          }
          upsert: {
            args: Prisma.DiscussionGroupUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DiscussionGroupPayload>
          }
          aggregate: {
            args: Prisma.DiscussionGroupAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDiscussionGroup>
          }
          groupBy: {
            args: Prisma.DiscussionGroupGroupByArgs<ExtArgs>
            result: $Utils.Optional<DiscussionGroupGroupByOutputType>[]
          }
          count: {
            args: Prisma.DiscussionGroupCountArgs<ExtArgs>
            result: $Utils.Optional<DiscussionGroupCountAggregateOutputType> | number
          }
        }
      }
      Section: {
        payload: Prisma.$SectionPayload<ExtArgs>
        fields: Prisma.SectionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SectionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SectionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SectionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SectionPayload>
          }
          findFirst: {
            args: Prisma.SectionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SectionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SectionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SectionPayload>
          }
          findMany: {
            args: Prisma.SectionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SectionPayload>[]
          }
          create: {
            args: Prisma.SectionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SectionPayload>
          }
          createMany: {
            args: Prisma.SectionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SectionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SectionPayload>[]
          }
          delete: {
            args: Prisma.SectionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SectionPayload>
          }
          update: {
            args: Prisma.SectionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SectionPayload>
          }
          deleteMany: {
            args: Prisma.SectionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SectionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SectionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SectionPayload>[]
          }
          upsert: {
            args: Prisma.SectionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SectionPayload>
          }
          aggregate: {
            args: Prisma.SectionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSection>
          }
          groupBy: {
            args: Prisma.SectionGroupByArgs<ExtArgs>
            result: $Utils.Optional<SectionGroupByOutputType>[]
          }
          count: {
            args: Prisma.SectionCountArgs<ExtArgs>
            result: $Utils.Optional<SectionCountAggregateOutputType> | number
          }
        }
      }
      Meeting: {
        payload: Prisma.$MeetingPayload<ExtArgs>
        fields: Prisma.MeetingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MeetingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MeetingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MeetingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MeetingPayload>
          }
          findFirst: {
            args: Prisma.MeetingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MeetingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MeetingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MeetingPayload>
          }
          findMany: {
            args: Prisma.MeetingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MeetingPayload>[]
          }
          create: {
            args: Prisma.MeetingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MeetingPayload>
          }
          createMany: {
            args: Prisma.MeetingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MeetingCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MeetingPayload>[]
          }
          delete: {
            args: Prisma.MeetingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MeetingPayload>
          }
          update: {
            args: Prisma.MeetingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MeetingPayload>
          }
          deleteMany: {
            args: Prisma.MeetingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MeetingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MeetingUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MeetingPayload>[]
          }
          upsert: {
            args: Prisma.MeetingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MeetingPayload>
          }
          aggregate: {
            args: Prisma.MeetingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMeeting>
          }
          groupBy: {
            args: Prisma.MeetingGroupByArgs<ExtArgs>
            result: $Utils.Optional<MeetingGroupByOutputType>[]
          }
          count: {
            args: Prisma.MeetingCountArgs<ExtArgs>
            result: $Utils.Optional<MeetingCountAggregateOutputType> | number
          }
        }
      }
      Instructor: {
        payload: Prisma.$InstructorPayload<ExtArgs>
        fields: Prisma.InstructorFieldRefs
        operations: {
          findUnique: {
            args: Prisma.InstructorFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InstructorPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.InstructorFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InstructorPayload>
          }
          findFirst: {
            args: Prisma.InstructorFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InstructorPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.InstructorFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InstructorPayload>
          }
          findMany: {
            args: Prisma.InstructorFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InstructorPayload>[]
          }
          create: {
            args: Prisma.InstructorCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InstructorPayload>
          }
          createMany: {
            args: Prisma.InstructorCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.InstructorCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InstructorPayload>[]
          }
          delete: {
            args: Prisma.InstructorDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InstructorPayload>
          }
          update: {
            args: Prisma.InstructorUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InstructorPayload>
          }
          deleteMany: {
            args: Prisma.InstructorDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.InstructorUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.InstructorUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InstructorPayload>[]
          }
          upsert: {
            args: Prisma.InstructorUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InstructorPayload>
          }
          aggregate: {
            args: Prisma.InstructorAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateInstructor>
          }
          groupBy: {
            args: Prisma.InstructorGroupByArgs<ExtArgs>
            result: $Utils.Optional<InstructorGroupByOutputType>[]
          }
          count: {
            args: Prisma.InstructorCountArgs<ExtArgs>
            result: $Utils.Optional<InstructorCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    department?: DepartmentOmit
    course?: CourseOmit
    discussionGroup?: DiscussionGroupOmit
    section?: SectionOmit
    meeting?: MeetingOmit
    instructor?: InstructorOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type DepartmentCountOutputType
   */

  export type DepartmentCountOutputType = {
    courses: number
    instructors: number
  }

  export type DepartmentCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    courses?: boolean | DepartmentCountOutputTypeCountCoursesArgs
    instructors?: boolean | DepartmentCountOutputTypeCountInstructorsArgs
  }

  // Custom InputTypes
  /**
   * DepartmentCountOutputType without action
   */
  export type DepartmentCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DepartmentCountOutputType
     */
    select?: DepartmentCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * DepartmentCountOutputType without action
   */
  export type DepartmentCountOutputTypeCountCoursesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CourseWhereInput
  }

  /**
   * DepartmentCountOutputType without action
   */
  export type DepartmentCountOutputTypeCountInstructorsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InstructorWhereInput
  }


  /**
   * Count Type CourseCountOutputType
   */

  export type CourseCountOutputType = {
    sections: number
    discussionGroups: number
  }

  export type CourseCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sections?: boolean | CourseCountOutputTypeCountSectionsArgs
    discussionGroups?: boolean | CourseCountOutputTypeCountDiscussionGroupsArgs
  }

  // Custom InputTypes
  /**
   * CourseCountOutputType without action
   */
  export type CourseCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseCountOutputType
     */
    select?: CourseCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CourseCountOutputType without action
   */
  export type CourseCountOutputTypeCountSectionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SectionWhereInput
  }

  /**
   * CourseCountOutputType without action
   */
  export type CourseCountOutputTypeCountDiscussionGroupsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DiscussionGroupWhereInput
  }


  /**
   * Count Type DiscussionGroupCountOutputType
   */

  export type DiscussionGroupCountOutputType = {
    sections: number
  }

  export type DiscussionGroupCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sections?: boolean | DiscussionGroupCountOutputTypeCountSectionsArgs
  }

  // Custom InputTypes
  /**
   * DiscussionGroupCountOutputType without action
   */
  export type DiscussionGroupCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiscussionGroupCountOutputType
     */
    select?: DiscussionGroupCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * DiscussionGroupCountOutputType without action
   */
  export type DiscussionGroupCountOutputTypeCountSectionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SectionWhereInput
  }


  /**
   * Count Type SectionCountOutputType
   */

  export type SectionCountOutputType = {
    meetings: number
    instructors: number
  }

  export type SectionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    meetings?: boolean | SectionCountOutputTypeCountMeetingsArgs
    instructors?: boolean | SectionCountOutputTypeCountInstructorsArgs
  }

  // Custom InputTypes
  /**
   * SectionCountOutputType without action
   */
  export type SectionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SectionCountOutputType
     */
    select?: SectionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SectionCountOutputType without action
   */
  export type SectionCountOutputTypeCountMeetingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MeetingWhereInput
  }

  /**
   * SectionCountOutputType without action
   */
  export type SectionCountOutputTypeCountInstructorsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InstructorWhereInput
  }


  /**
   * Count Type InstructorCountOutputType
   */

  export type InstructorCountOutputType = {
    sections: number
    departments: number
  }

  export type InstructorCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sections?: boolean | InstructorCountOutputTypeCountSectionsArgs
    departments?: boolean | InstructorCountOutputTypeCountDepartmentsArgs
  }

  // Custom InputTypes
  /**
   * InstructorCountOutputType without action
   */
  export type InstructorCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InstructorCountOutputType
     */
    select?: InstructorCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * InstructorCountOutputType without action
   */
  export type InstructorCountOutputTypeCountSectionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SectionWhereInput
  }

  /**
   * InstructorCountOutputType without action
   */
  export type InstructorCountOutputTypeCountDepartmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DepartmentWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Department
   */

  export type AggregateDepartment = {
    _count: DepartmentCountAggregateOutputType | null
    _avg: DepartmentAvgAggregateOutputType | null
    _sum: DepartmentSumAggregateOutputType | null
    _min: DepartmentMinAggregateOutputType | null
    _max: DepartmentMaxAggregateOutputType | null
  }

  export type DepartmentAvgAggregateOutputType = {
    id: number | null
  }

  export type DepartmentSumAggregateOutputType = {
    id: number | null
  }

  export type DepartmentMinAggregateOutputType = {
    id: number | null
    code: string | null
    title: string | null
  }

  export type DepartmentMaxAggregateOutputType = {
    id: number | null
    code: string | null
    title: string | null
  }

  export type DepartmentCountAggregateOutputType = {
    id: number
    code: number
    title: number
    _all: number
  }


  export type DepartmentAvgAggregateInputType = {
    id?: true
  }

  export type DepartmentSumAggregateInputType = {
    id?: true
  }

  export type DepartmentMinAggregateInputType = {
    id?: true
    code?: true
    title?: true
  }

  export type DepartmentMaxAggregateInputType = {
    id?: true
    code?: true
    title?: true
  }

  export type DepartmentCountAggregateInputType = {
    id?: true
    code?: true
    title?: true
    _all?: true
  }

  export type DepartmentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Department to aggregate.
     */
    where?: DepartmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Departments to fetch.
     */
    orderBy?: DepartmentOrderByWithRelationInput | DepartmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DepartmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Departments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Departments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Departments
    **/
    _count?: true | DepartmentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DepartmentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DepartmentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DepartmentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DepartmentMaxAggregateInputType
  }

  export type GetDepartmentAggregateType<T extends DepartmentAggregateArgs> = {
        [P in keyof T & keyof AggregateDepartment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDepartment[P]>
      : GetScalarType<T[P], AggregateDepartment[P]>
  }




  export type DepartmentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DepartmentWhereInput
    orderBy?: DepartmentOrderByWithAggregationInput | DepartmentOrderByWithAggregationInput[]
    by: DepartmentScalarFieldEnum[] | DepartmentScalarFieldEnum
    having?: DepartmentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DepartmentCountAggregateInputType | true
    _avg?: DepartmentAvgAggregateInputType
    _sum?: DepartmentSumAggregateInputType
    _min?: DepartmentMinAggregateInputType
    _max?: DepartmentMaxAggregateInputType
  }

  export type DepartmentGroupByOutputType = {
    id: number
    code: string
    title: string
    _count: DepartmentCountAggregateOutputType | null
    _avg: DepartmentAvgAggregateOutputType | null
    _sum: DepartmentSumAggregateOutputType | null
    _min: DepartmentMinAggregateOutputType | null
    _max: DepartmentMaxAggregateOutputType | null
  }

  type GetDepartmentGroupByPayload<T extends DepartmentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DepartmentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DepartmentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DepartmentGroupByOutputType[P]>
            : GetScalarType<T[P], DepartmentGroupByOutputType[P]>
        }
      >
    >


  export type DepartmentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    title?: boolean
    courses?: boolean | Department$coursesArgs<ExtArgs>
    instructors?: boolean | Department$instructorsArgs<ExtArgs>
    _count?: boolean | DepartmentCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["department"]>

  export type DepartmentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    title?: boolean
  }, ExtArgs["result"]["department"]>

  export type DepartmentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    title?: boolean
  }, ExtArgs["result"]["department"]>

  export type DepartmentSelectScalar = {
    id?: boolean
    code?: boolean
    title?: boolean
  }

  export type DepartmentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "code" | "title", ExtArgs["result"]["department"]>
  export type DepartmentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    courses?: boolean | Department$coursesArgs<ExtArgs>
    instructors?: boolean | Department$instructorsArgs<ExtArgs>
    _count?: boolean | DepartmentCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type DepartmentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type DepartmentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $DepartmentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Department"
    objects: {
      courses: Prisma.$CoursePayload<ExtArgs>[]
      instructors: Prisma.$InstructorPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      code: string
      title: string
    }, ExtArgs["result"]["department"]>
    composites: {}
  }

  type DepartmentGetPayload<S extends boolean | null | undefined | DepartmentDefaultArgs> = $Result.GetResult<Prisma.$DepartmentPayload, S>

  type DepartmentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DepartmentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DepartmentCountAggregateInputType | true
    }

  export interface DepartmentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Department'], meta: { name: 'Department' } }
    /**
     * Find zero or one Department that matches the filter.
     * @param {DepartmentFindUniqueArgs} args - Arguments to find a Department
     * @example
     * // Get one Department
     * const department = await prisma.department.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DepartmentFindUniqueArgs>(args: SelectSubset<T, DepartmentFindUniqueArgs<ExtArgs>>): Prisma__DepartmentClient<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Department that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DepartmentFindUniqueOrThrowArgs} args - Arguments to find a Department
     * @example
     * // Get one Department
     * const department = await prisma.department.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DepartmentFindUniqueOrThrowArgs>(args: SelectSubset<T, DepartmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DepartmentClient<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Department that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DepartmentFindFirstArgs} args - Arguments to find a Department
     * @example
     * // Get one Department
     * const department = await prisma.department.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DepartmentFindFirstArgs>(args?: SelectSubset<T, DepartmentFindFirstArgs<ExtArgs>>): Prisma__DepartmentClient<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Department that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DepartmentFindFirstOrThrowArgs} args - Arguments to find a Department
     * @example
     * // Get one Department
     * const department = await prisma.department.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DepartmentFindFirstOrThrowArgs>(args?: SelectSubset<T, DepartmentFindFirstOrThrowArgs<ExtArgs>>): Prisma__DepartmentClient<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Departments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DepartmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Departments
     * const departments = await prisma.department.findMany()
     * 
     * // Get first 10 Departments
     * const departments = await prisma.department.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const departmentWithIdOnly = await prisma.department.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DepartmentFindManyArgs>(args?: SelectSubset<T, DepartmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Department.
     * @param {DepartmentCreateArgs} args - Arguments to create a Department.
     * @example
     * // Create one Department
     * const Department = await prisma.department.create({
     *   data: {
     *     // ... data to create a Department
     *   }
     * })
     * 
     */
    create<T extends DepartmentCreateArgs>(args: SelectSubset<T, DepartmentCreateArgs<ExtArgs>>): Prisma__DepartmentClient<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Departments.
     * @param {DepartmentCreateManyArgs} args - Arguments to create many Departments.
     * @example
     * // Create many Departments
     * const department = await prisma.department.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DepartmentCreateManyArgs>(args?: SelectSubset<T, DepartmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Departments and returns the data saved in the database.
     * @param {DepartmentCreateManyAndReturnArgs} args - Arguments to create many Departments.
     * @example
     * // Create many Departments
     * const department = await prisma.department.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Departments and only return the `id`
     * const departmentWithIdOnly = await prisma.department.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DepartmentCreateManyAndReturnArgs>(args?: SelectSubset<T, DepartmentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Department.
     * @param {DepartmentDeleteArgs} args - Arguments to delete one Department.
     * @example
     * // Delete one Department
     * const Department = await prisma.department.delete({
     *   where: {
     *     // ... filter to delete one Department
     *   }
     * })
     * 
     */
    delete<T extends DepartmentDeleteArgs>(args: SelectSubset<T, DepartmentDeleteArgs<ExtArgs>>): Prisma__DepartmentClient<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Department.
     * @param {DepartmentUpdateArgs} args - Arguments to update one Department.
     * @example
     * // Update one Department
     * const department = await prisma.department.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DepartmentUpdateArgs>(args: SelectSubset<T, DepartmentUpdateArgs<ExtArgs>>): Prisma__DepartmentClient<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Departments.
     * @param {DepartmentDeleteManyArgs} args - Arguments to filter Departments to delete.
     * @example
     * // Delete a few Departments
     * const { count } = await prisma.department.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DepartmentDeleteManyArgs>(args?: SelectSubset<T, DepartmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Departments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DepartmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Departments
     * const department = await prisma.department.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DepartmentUpdateManyArgs>(args: SelectSubset<T, DepartmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Departments and returns the data updated in the database.
     * @param {DepartmentUpdateManyAndReturnArgs} args - Arguments to update many Departments.
     * @example
     * // Update many Departments
     * const department = await prisma.department.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Departments and only return the `id`
     * const departmentWithIdOnly = await prisma.department.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DepartmentUpdateManyAndReturnArgs>(args: SelectSubset<T, DepartmentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Department.
     * @param {DepartmentUpsertArgs} args - Arguments to update or create a Department.
     * @example
     * // Update or create a Department
     * const department = await prisma.department.upsert({
     *   create: {
     *     // ... data to create a Department
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Department we want to update
     *   }
     * })
     */
    upsert<T extends DepartmentUpsertArgs>(args: SelectSubset<T, DepartmentUpsertArgs<ExtArgs>>): Prisma__DepartmentClient<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Departments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DepartmentCountArgs} args - Arguments to filter Departments to count.
     * @example
     * // Count the number of Departments
     * const count = await prisma.department.count({
     *   where: {
     *     // ... the filter for the Departments we want to count
     *   }
     * })
    **/
    count<T extends DepartmentCountArgs>(
      args?: Subset<T, DepartmentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DepartmentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Department.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DepartmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DepartmentAggregateArgs>(args: Subset<T, DepartmentAggregateArgs>): Prisma.PrismaPromise<GetDepartmentAggregateType<T>>

    /**
     * Group by Department.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DepartmentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DepartmentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DepartmentGroupByArgs['orderBy'] }
        : { orderBy?: DepartmentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DepartmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDepartmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Department model
   */
  readonly fields: DepartmentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Department.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DepartmentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    courses<T extends Department$coursesArgs<ExtArgs> = {}>(args?: Subset<T, Department$coursesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    instructors<T extends Department$instructorsArgs<ExtArgs> = {}>(args?: Subset<T, Department$instructorsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InstructorPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Department model
   */
  interface DepartmentFieldRefs {
    readonly id: FieldRef<"Department", 'Int'>
    readonly code: FieldRef<"Department", 'String'>
    readonly title: FieldRef<"Department", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Department findUnique
   */
  export type DepartmentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Department
     */
    omit?: DepartmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DepartmentInclude<ExtArgs> | null
    /**
     * Filter, which Department to fetch.
     */
    where: DepartmentWhereUniqueInput
  }

  /**
   * Department findUniqueOrThrow
   */
  export type DepartmentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Department
     */
    omit?: DepartmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DepartmentInclude<ExtArgs> | null
    /**
     * Filter, which Department to fetch.
     */
    where: DepartmentWhereUniqueInput
  }

  /**
   * Department findFirst
   */
  export type DepartmentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Department
     */
    omit?: DepartmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DepartmentInclude<ExtArgs> | null
    /**
     * Filter, which Department to fetch.
     */
    where?: DepartmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Departments to fetch.
     */
    orderBy?: DepartmentOrderByWithRelationInput | DepartmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Departments.
     */
    cursor?: DepartmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Departments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Departments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Departments.
     */
    distinct?: DepartmentScalarFieldEnum | DepartmentScalarFieldEnum[]
  }

  /**
   * Department findFirstOrThrow
   */
  export type DepartmentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Department
     */
    omit?: DepartmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DepartmentInclude<ExtArgs> | null
    /**
     * Filter, which Department to fetch.
     */
    where?: DepartmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Departments to fetch.
     */
    orderBy?: DepartmentOrderByWithRelationInput | DepartmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Departments.
     */
    cursor?: DepartmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Departments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Departments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Departments.
     */
    distinct?: DepartmentScalarFieldEnum | DepartmentScalarFieldEnum[]
  }

  /**
   * Department findMany
   */
  export type DepartmentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Department
     */
    omit?: DepartmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DepartmentInclude<ExtArgs> | null
    /**
     * Filter, which Departments to fetch.
     */
    where?: DepartmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Departments to fetch.
     */
    orderBy?: DepartmentOrderByWithRelationInput | DepartmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Departments.
     */
    cursor?: DepartmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Departments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Departments.
     */
    skip?: number
    distinct?: DepartmentScalarFieldEnum | DepartmentScalarFieldEnum[]
  }

  /**
   * Department create
   */
  export type DepartmentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Department
     */
    omit?: DepartmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DepartmentInclude<ExtArgs> | null
    /**
     * The data needed to create a Department.
     */
    data: XOR<DepartmentCreateInput, DepartmentUncheckedCreateInput>
  }

  /**
   * Department createMany
   */
  export type DepartmentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Departments.
     */
    data: DepartmentCreateManyInput | DepartmentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Department createManyAndReturn
   */
  export type DepartmentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Department
     */
    omit?: DepartmentOmit<ExtArgs> | null
    /**
     * The data used to create many Departments.
     */
    data: DepartmentCreateManyInput | DepartmentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Department update
   */
  export type DepartmentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Department
     */
    omit?: DepartmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DepartmentInclude<ExtArgs> | null
    /**
     * The data needed to update a Department.
     */
    data: XOR<DepartmentUpdateInput, DepartmentUncheckedUpdateInput>
    /**
     * Choose, which Department to update.
     */
    where: DepartmentWhereUniqueInput
  }

  /**
   * Department updateMany
   */
  export type DepartmentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Departments.
     */
    data: XOR<DepartmentUpdateManyMutationInput, DepartmentUncheckedUpdateManyInput>
    /**
     * Filter which Departments to update
     */
    where?: DepartmentWhereInput
    /**
     * Limit how many Departments to update.
     */
    limit?: number
  }

  /**
   * Department updateManyAndReturn
   */
  export type DepartmentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Department
     */
    omit?: DepartmentOmit<ExtArgs> | null
    /**
     * The data used to update Departments.
     */
    data: XOR<DepartmentUpdateManyMutationInput, DepartmentUncheckedUpdateManyInput>
    /**
     * Filter which Departments to update
     */
    where?: DepartmentWhereInput
    /**
     * Limit how many Departments to update.
     */
    limit?: number
  }

  /**
   * Department upsert
   */
  export type DepartmentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Department
     */
    omit?: DepartmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DepartmentInclude<ExtArgs> | null
    /**
     * The filter to search for the Department to update in case it exists.
     */
    where: DepartmentWhereUniqueInput
    /**
     * In case the Department found by the `where` argument doesn't exist, create a new Department with this data.
     */
    create: XOR<DepartmentCreateInput, DepartmentUncheckedCreateInput>
    /**
     * In case the Department was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DepartmentUpdateInput, DepartmentUncheckedUpdateInput>
  }

  /**
   * Department delete
   */
  export type DepartmentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Department
     */
    omit?: DepartmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DepartmentInclude<ExtArgs> | null
    /**
     * Filter which Department to delete.
     */
    where: DepartmentWhereUniqueInput
  }

  /**
   * Department deleteMany
   */
  export type DepartmentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Departments to delete
     */
    where?: DepartmentWhereInput
    /**
     * Limit how many Departments to delete.
     */
    limit?: number
  }

  /**
   * Department.courses
   */
  export type Department$coursesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    where?: CourseWhereInput
    orderBy?: CourseOrderByWithRelationInput | CourseOrderByWithRelationInput[]
    cursor?: CourseWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CourseScalarFieldEnum | CourseScalarFieldEnum[]
  }

  /**
   * Department.instructors
   */
  export type Department$instructorsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Instructor
     */
    select?: InstructorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Instructor
     */
    omit?: InstructorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstructorInclude<ExtArgs> | null
    where?: InstructorWhereInput
    orderBy?: InstructorOrderByWithRelationInput | InstructorOrderByWithRelationInput[]
    cursor?: InstructorWhereUniqueInput
    take?: number
    skip?: number
    distinct?: InstructorScalarFieldEnum | InstructorScalarFieldEnum[]
  }

  /**
   * Department without action
   */
  export type DepartmentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Department
     */
    omit?: DepartmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DepartmentInclude<ExtArgs> | null
  }


  /**
   * Model Course
   */

  export type AggregateCourse = {
    _count: CourseCountAggregateOutputType | null
    _avg: CourseAvgAggregateOutputType | null
    _sum: CourseSumAggregateOutputType | null
    _min: CourseMinAggregateOutputType | null
    _max: CourseMaxAggregateOutputType | null
  }

  export type CourseAvgAggregateOutputType = {
    id: number | null
    departmentId: number | null
  }

  export type CourseSumAggregateOutputType = {
    id: number | null
    departmentId: number | null
  }

  export type CourseMinAggregateOutputType = {
    id: number | null
    code: string | null
    title: string | null
    description: string | null
    departmentId: number | null
  }

  export type CourseMaxAggregateOutputType = {
    id: number | null
    code: string | null
    title: string | null
    description: string | null
    departmentId: number | null
  }

  export type CourseCountAggregateOutputType = {
    id: number
    code: number
    title: number
    description: number
    departmentId: number
    _all: number
  }


  export type CourseAvgAggregateInputType = {
    id?: true
    departmentId?: true
  }

  export type CourseSumAggregateInputType = {
    id?: true
    departmentId?: true
  }

  export type CourseMinAggregateInputType = {
    id?: true
    code?: true
    title?: true
    description?: true
    departmentId?: true
  }

  export type CourseMaxAggregateInputType = {
    id?: true
    code?: true
    title?: true
    description?: true
    departmentId?: true
  }

  export type CourseCountAggregateInputType = {
    id?: true
    code?: true
    title?: true
    description?: true
    departmentId?: true
    _all?: true
  }

  export type CourseAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Course to aggregate.
     */
    where?: CourseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Courses to fetch.
     */
    orderBy?: CourseOrderByWithRelationInput | CourseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CourseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Courses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Courses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Courses
    **/
    _count?: true | CourseCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CourseAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CourseSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CourseMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CourseMaxAggregateInputType
  }

  export type GetCourseAggregateType<T extends CourseAggregateArgs> = {
        [P in keyof T & keyof AggregateCourse]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCourse[P]>
      : GetScalarType<T[P], AggregateCourse[P]>
  }




  export type CourseGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CourseWhereInput
    orderBy?: CourseOrderByWithAggregationInput | CourseOrderByWithAggregationInput[]
    by: CourseScalarFieldEnum[] | CourseScalarFieldEnum
    having?: CourseScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CourseCountAggregateInputType | true
    _avg?: CourseAvgAggregateInputType
    _sum?: CourseSumAggregateInputType
    _min?: CourseMinAggregateInputType
    _max?: CourseMaxAggregateInputType
  }

  export type CourseGroupByOutputType = {
    id: number
    code: string
    title: string
    description: string
    departmentId: number
    _count: CourseCountAggregateOutputType | null
    _avg: CourseAvgAggregateOutputType | null
    _sum: CourseSumAggregateOutputType | null
    _min: CourseMinAggregateOutputType | null
    _max: CourseMaxAggregateOutputType | null
  }

  type GetCourseGroupByPayload<T extends CourseGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CourseGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CourseGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CourseGroupByOutputType[P]>
            : GetScalarType<T[P], CourseGroupByOutputType[P]>
        }
      >
    >


  export type CourseSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    title?: boolean
    description?: boolean
    departmentId?: boolean
    sections?: boolean | Course$sectionsArgs<ExtArgs>
    discussionGroups?: boolean | Course$discussionGroupsArgs<ExtArgs>
    department?: boolean | DepartmentDefaultArgs<ExtArgs>
    _count?: boolean | CourseCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["course"]>

  export type CourseSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    title?: boolean
    description?: boolean
    departmentId?: boolean
    department?: boolean | DepartmentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["course"]>

  export type CourseSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    title?: boolean
    description?: boolean
    departmentId?: boolean
    department?: boolean | DepartmentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["course"]>

  export type CourseSelectScalar = {
    id?: boolean
    code?: boolean
    title?: boolean
    description?: boolean
    departmentId?: boolean
  }

  export type CourseOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "code" | "title" | "description" | "departmentId", ExtArgs["result"]["course"]>
  export type CourseInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sections?: boolean | Course$sectionsArgs<ExtArgs>
    discussionGroups?: boolean | Course$discussionGroupsArgs<ExtArgs>
    department?: boolean | DepartmentDefaultArgs<ExtArgs>
    _count?: boolean | CourseCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CourseIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    department?: boolean | DepartmentDefaultArgs<ExtArgs>
  }
  export type CourseIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    department?: boolean | DepartmentDefaultArgs<ExtArgs>
  }

  export type $CoursePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Course"
    objects: {
      sections: Prisma.$SectionPayload<ExtArgs>[]
      discussionGroups: Prisma.$DiscussionGroupPayload<ExtArgs>[]
      department: Prisma.$DepartmentPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      code: string
      title: string
      description: string
      departmentId: number
    }, ExtArgs["result"]["course"]>
    composites: {}
  }

  type CourseGetPayload<S extends boolean | null | undefined | CourseDefaultArgs> = $Result.GetResult<Prisma.$CoursePayload, S>

  type CourseCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CourseFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CourseCountAggregateInputType | true
    }

  export interface CourseDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Course'], meta: { name: 'Course' } }
    /**
     * Find zero or one Course that matches the filter.
     * @param {CourseFindUniqueArgs} args - Arguments to find a Course
     * @example
     * // Get one Course
     * const course = await prisma.course.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CourseFindUniqueArgs>(args: SelectSubset<T, CourseFindUniqueArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Course that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CourseFindUniqueOrThrowArgs} args - Arguments to find a Course
     * @example
     * // Get one Course
     * const course = await prisma.course.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CourseFindUniqueOrThrowArgs>(args: SelectSubset<T, CourseFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Course that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseFindFirstArgs} args - Arguments to find a Course
     * @example
     * // Get one Course
     * const course = await prisma.course.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CourseFindFirstArgs>(args?: SelectSubset<T, CourseFindFirstArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Course that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseFindFirstOrThrowArgs} args - Arguments to find a Course
     * @example
     * // Get one Course
     * const course = await prisma.course.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CourseFindFirstOrThrowArgs>(args?: SelectSubset<T, CourseFindFirstOrThrowArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Courses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Courses
     * const courses = await prisma.course.findMany()
     * 
     * // Get first 10 Courses
     * const courses = await prisma.course.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const courseWithIdOnly = await prisma.course.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CourseFindManyArgs>(args?: SelectSubset<T, CourseFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Course.
     * @param {CourseCreateArgs} args - Arguments to create a Course.
     * @example
     * // Create one Course
     * const Course = await prisma.course.create({
     *   data: {
     *     // ... data to create a Course
     *   }
     * })
     * 
     */
    create<T extends CourseCreateArgs>(args: SelectSubset<T, CourseCreateArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Courses.
     * @param {CourseCreateManyArgs} args - Arguments to create many Courses.
     * @example
     * // Create many Courses
     * const course = await prisma.course.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CourseCreateManyArgs>(args?: SelectSubset<T, CourseCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Courses and returns the data saved in the database.
     * @param {CourseCreateManyAndReturnArgs} args - Arguments to create many Courses.
     * @example
     * // Create many Courses
     * const course = await prisma.course.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Courses and only return the `id`
     * const courseWithIdOnly = await prisma.course.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CourseCreateManyAndReturnArgs>(args?: SelectSubset<T, CourseCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Course.
     * @param {CourseDeleteArgs} args - Arguments to delete one Course.
     * @example
     * // Delete one Course
     * const Course = await prisma.course.delete({
     *   where: {
     *     // ... filter to delete one Course
     *   }
     * })
     * 
     */
    delete<T extends CourseDeleteArgs>(args: SelectSubset<T, CourseDeleteArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Course.
     * @param {CourseUpdateArgs} args - Arguments to update one Course.
     * @example
     * // Update one Course
     * const course = await prisma.course.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CourseUpdateArgs>(args: SelectSubset<T, CourseUpdateArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Courses.
     * @param {CourseDeleteManyArgs} args - Arguments to filter Courses to delete.
     * @example
     * // Delete a few Courses
     * const { count } = await prisma.course.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CourseDeleteManyArgs>(args?: SelectSubset<T, CourseDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Courses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Courses
     * const course = await prisma.course.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CourseUpdateManyArgs>(args: SelectSubset<T, CourseUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Courses and returns the data updated in the database.
     * @param {CourseUpdateManyAndReturnArgs} args - Arguments to update many Courses.
     * @example
     * // Update many Courses
     * const course = await prisma.course.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Courses and only return the `id`
     * const courseWithIdOnly = await prisma.course.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CourseUpdateManyAndReturnArgs>(args: SelectSubset<T, CourseUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Course.
     * @param {CourseUpsertArgs} args - Arguments to update or create a Course.
     * @example
     * // Update or create a Course
     * const course = await prisma.course.upsert({
     *   create: {
     *     // ... data to create a Course
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Course we want to update
     *   }
     * })
     */
    upsert<T extends CourseUpsertArgs>(args: SelectSubset<T, CourseUpsertArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Courses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseCountArgs} args - Arguments to filter Courses to count.
     * @example
     * // Count the number of Courses
     * const count = await prisma.course.count({
     *   where: {
     *     // ... the filter for the Courses we want to count
     *   }
     * })
    **/
    count<T extends CourseCountArgs>(
      args?: Subset<T, CourseCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CourseCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Course.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CourseAggregateArgs>(args: Subset<T, CourseAggregateArgs>): Prisma.PrismaPromise<GetCourseAggregateType<T>>

    /**
     * Group by Course.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CourseGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CourseGroupByArgs['orderBy'] }
        : { orderBy?: CourseGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CourseGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCourseGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Course model
   */
  readonly fields: CourseFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Course.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CourseClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    sections<T extends Course$sectionsArgs<ExtArgs> = {}>(args?: Subset<T, Course$sectionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SectionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    discussionGroups<T extends Course$discussionGroupsArgs<ExtArgs> = {}>(args?: Subset<T, Course$discussionGroupsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DiscussionGroupPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    department<T extends DepartmentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DepartmentDefaultArgs<ExtArgs>>): Prisma__DepartmentClient<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Course model
   */
  interface CourseFieldRefs {
    readonly id: FieldRef<"Course", 'Int'>
    readonly code: FieldRef<"Course", 'String'>
    readonly title: FieldRef<"Course", 'String'>
    readonly description: FieldRef<"Course", 'String'>
    readonly departmentId: FieldRef<"Course", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Course findUnique
   */
  export type CourseFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * Filter, which Course to fetch.
     */
    where: CourseWhereUniqueInput
  }

  /**
   * Course findUniqueOrThrow
   */
  export type CourseFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * Filter, which Course to fetch.
     */
    where: CourseWhereUniqueInput
  }

  /**
   * Course findFirst
   */
  export type CourseFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * Filter, which Course to fetch.
     */
    where?: CourseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Courses to fetch.
     */
    orderBy?: CourseOrderByWithRelationInput | CourseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Courses.
     */
    cursor?: CourseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Courses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Courses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Courses.
     */
    distinct?: CourseScalarFieldEnum | CourseScalarFieldEnum[]
  }

  /**
   * Course findFirstOrThrow
   */
  export type CourseFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * Filter, which Course to fetch.
     */
    where?: CourseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Courses to fetch.
     */
    orderBy?: CourseOrderByWithRelationInput | CourseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Courses.
     */
    cursor?: CourseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Courses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Courses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Courses.
     */
    distinct?: CourseScalarFieldEnum | CourseScalarFieldEnum[]
  }

  /**
   * Course findMany
   */
  export type CourseFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * Filter, which Courses to fetch.
     */
    where?: CourseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Courses to fetch.
     */
    orderBy?: CourseOrderByWithRelationInput | CourseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Courses.
     */
    cursor?: CourseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Courses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Courses.
     */
    skip?: number
    distinct?: CourseScalarFieldEnum | CourseScalarFieldEnum[]
  }

  /**
   * Course create
   */
  export type CourseCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * The data needed to create a Course.
     */
    data: XOR<CourseCreateInput, CourseUncheckedCreateInput>
  }

  /**
   * Course createMany
   */
  export type CourseCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Courses.
     */
    data: CourseCreateManyInput | CourseCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Course createManyAndReturn
   */
  export type CourseCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * The data used to create many Courses.
     */
    data: CourseCreateManyInput | CourseCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Course update
   */
  export type CourseUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * The data needed to update a Course.
     */
    data: XOR<CourseUpdateInput, CourseUncheckedUpdateInput>
    /**
     * Choose, which Course to update.
     */
    where: CourseWhereUniqueInput
  }

  /**
   * Course updateMany
   */
  export type CourseUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Courses.
     */
    data: XOR<CourseUpdateManyMutationInput, CourseUncheckedUpdateManyInput>
    /**
     * Filter which Courses to update
     */
    where?: CourseWhereInput
    /**
     * Limit how many Courses to update.
     */
    limit?: number
  }

  /**
   * Course updateManyAndReturn
   */
  export type CourseUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * The data used to update Courses.
     */
    data: XOR<CourseUpdateManyMutationInput, CourseUncheckedUpdateManyInput>
    /**
     * Filter which Courses to update
     */
    where?: CourseWhereInput
    /**
     * Limit how many Courses to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Course upsert
   */
  export type CourseUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * The filter to search for the Course to update in case it exists.
     */
    where: CourseWhereUniqueInput
    /**
     * In case the Course found by the `where` argument doesn't exist, create a new Course with this data.
     */
    create: XOR<CourseCreateInput, CourseUncheckedCreateInput>
    /**
     * In case the Course was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CourseUpdateInput, CourseUncheckedUpdateInput>
  }

  /**
   * Course delete
   */
  export type CourseDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * Filter which Course to delete.
     */
    where: CourseWhereUniqueInput
  }

  /**
   * Course deleteMany
   */
  export type CourseDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Courses to delete
     */
    where?: CourseWhereInput
    /**
     * Limit how many Courses to delete.
     */
    limit?: number
  }

  /**
   * Course.sections
   */
  export type Course$sectionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Section
     */
    select?: SectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Section
     */
    omit?: SectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SectionInclude<ExtArgs> | null
    where?: SectionWhereInput
    orderBy?: SectionOrderByWithRelationInput | SectionOrderByWithRelationInput[]
    cursor?: SectionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SectionScalarFieldEnum | SectionScalarFieldEnum[]
  }

  /**
   * Course.discussionGroups
   */
  export type Course$discussionGroupsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiscussionGroup
     */
    select?: DiscussionGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DiscussionGroup
     */
    omit?: DiscussionGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiscussionGroupInclude<ExtArgs> | null
    where?: DiscussionGroupWhereInput
    orderBy?: DiscussionGroupOrderByWithRelationInput | DiscussionGroupOrderByWithRelationInput[]
    cursor?: DiscussionGroupWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DiscussionGroupScalarFieldEnum | DiscussionGroupScalarFieldEnum[]
  }

  /**
   * Course without action
   */
  export type CourseDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
  }


  /**
   * Model DiscussionGroup
   */

  export type AggregateDiscussionGroup = {
    _count: DiscussionGroupCountAggregateOutputType | null
    _avg: DiscussionGroupAvgAggregateOutputType | null
    _sum: DiscussionGroupSumAggregateOutputType | null
    _min: DiscussionGroupMinAggregateOutputType | null
    _max: DiscussionGroupMaxAggregateOutputType | null
  }

  export type DiscussionGroupAvgAggregateOutputType = {
    id: number | null
    courseId: number | null
  }

  export type DiscussionGroupSumAggregateOutputType = {
    id: number | null
    courseId: number | null
  }

  export type DiscussionGroupMinAggregateOutputType = {
    id: number | null
    courseId: number | null
    term: string | null
  }

  export type DiscussionGroupMaxAggregateOutputType = {
    id: number | null
    courseId: number | null
    term: string | null
  }

  export type DiscussionGroupCountAggregateOutputType = {
    id: number
    courseId: number
    term: number
    _all: number
  }


  export type DiscussionGroupAvgAggregateInputType = {
    id?: true
    courseId?: true
  }

  export type DiscussionGroupSumAggregateInputType = {
    id?: true
    courseId?: true
  }

  export type DiscussionGroupMinAggregateInputType = {
    id?: true
    courseId?: true
    term?: true
  }

  export type DiscussionGroupMaxAggregateInputType = {
    id?: true
    courseId?: true
    term?: true
  }

  export type DiscussionGroupCountAggregateInputType = {
    id?: true
    courseId?: true
    term?: true
    _all?: true
  }

  export type DiscussionGroupAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DiscussionGroup to aggregate.
     */
    where?: DiscussionGroupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DiscussionGroups to fetch.
     */
    orderBy?: DiscussionGroupOrderByWithRelationInput | DiscussionGroupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DiscussionGroupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DiscussionGroups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DiscussionGroups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DiscussionGroups
    **/
    _count?: true | DiscussionGroupCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DiscussionGroupAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DiscussionGroupSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DiscussionGroupMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DiscussionGroupMaxAggregateInputType
  }

  export type GetDiscussionGroupAggregateType<T extends DiscussionGroupAggregateArgs> = {
        [P in keyof T & keyof AggregateDiscussionGroup]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDiscussionGroup[P]>
      : GetScalarType<T[P], AggregateDiscussionGroup[P]>
  }




  export type DiscussionGroupGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DiscussionGroupWhereInput
    orderBy?: DiscussionGroupOrderByWithAggregationInput | DiscussionGroupOrderByWithAggregationInput[]
    by: DiscussionGroupScalarFieldEnum[] | DiscussionGroupScalarFieldEnum
    having?: DiscussionGroupScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DiscussionGroupCountAggregateInputType | true
    _avg?: DiscussionGroupAvgAggregateInputType
    _sum?: DiscussionGroupSumAggregateInputType
    _min?: DiscussionGroupMinAggregateInputType
    _max?: DiscussionGroupMaxAggregateInputType
  }

  export type DiscussionGroupGroupByOutputType = {
    id: number
    courseId: number
    term: string
    _count: DiscussionGroupCountAggregateOutputType | null
    _avg: DiscussionGroupAvgAggregateOutputType | null
    _sum: DiscussionGroupSumAggregateOutputType | null
    _min: DiscussionGroupMinAggregateOutputType | null
    _max: DiscussionGroupMaxAggregateOutputType | null
  }

  type GetDiscussionGroupGroupByPayload<T extends DiscussionGroupGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DiscussionGroupGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DiscussionGroupGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DiscussionGroupGroupByOutputType[P]>
            : GetScalarType<T[P], DiscussionGroupGroupByOutputType[P]>
        }
      >
    >


  export type DiscussionGroupSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    courseId?: boolean
    term?: boolean
    sections?: boolean | DiscussionGroup$sectionsArgs<ExtArgs>
    course?: boolean | CourseDefaultArgs<ExtArgs>
    _count?: boolean | DiscussionGroupCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["discussionGroup"]>

  export type DiscussionGroupSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    courseId?: boolean
    term?: boolean
    course?: boolean | CourseDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["discussionGroup"]>

  export type DiscussionGroupSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    courseId?: boolean
    term?: boolean
    course?: boolean | CourseDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["discussionGroup"]>

  export type DiscussionGroupSelectScalar = {
    id?: boolean
    courseId?: boolean
    term?: boolean
  }

  export type DiscussionGroupOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "courseId" | "term", ExtArgs["result"]["discussionGroup"]>
  export type DiscussionGroupInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sections?: boolean | DiscussionGroup$sectionsArgs<ExtArgs>
    course?: boolean | CourseDefaultArgs<ExtArgs>
    _count?: boolean | DiscussionGroupCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type DiscussionGroupIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    course?: boolean | CourseDefaultArgs<ExtArgs>
  }
  export type DiscussionGroupIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    course?: boolean | CourseDefaultArgs<ExtArgs>
  }

  export type $DiscussionGroupPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DiscussionGroup"
    objects: {
      sections: Prisma.$SectionPayload<ExtArgs>[]
      course: Prisma.$CoursePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      courseId: number
      term: string
    }, ExtArgs["result"]["discussionGroup"]>
    composites: {}
  }

  type DiscussionGroupGetPayload<S extends boolean | null | undefined | DiscussionGroupDefaultArgs> = $Result.GetResult<Prisma.$DiscussionGroupPayload, S>

  type DiscussionGroupCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DiscussionGroupFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DiscussionGroupCountAggregateInputType | true
    }

  export interface DiscussionGroupDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DiscussionGroup'], meta: { name: 'DiscussionGroup' } }
    /**
     * Find zero or one DiscussionGroup that matches the filter.
     * @param {DiscussionGroupFindUniqueArgs} args - Arguments to find a DiscussionGroup
     * @example
     * // Get one DiscussionGroup
     * const discussionGroup = await prisma.discussionGroup.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DiscussionGroupFindUniqueArgs>(args: SelectSubset<T, DiscussionGroupFindUniqueArgs<ExtArgs>>): Prisma__DiscussionGroupClient<$Result.GetResult<Prisma.$DiscussionGroupPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one DiscussionGroup that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DiscussionGroupFindUniqueOrThrowArgs} args - Arguments to find a DiscussionGroup
     * @example
     * // Get one DiscussionGroup
     * const discussionGroup = await prisma.discussionGroup.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DiscussionGroupFindUniqueOrThrowArgs>(args: SelectSubset<T, DiscussionGroupFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DiscussionGroupClient<$Result.GetResult<Prisma.$DiscussionGroupPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DiscussionGroup that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DiscussionGroupFindFirstArgs} args - Arguments to find a DiscussionGroup
     * @example
     * // Get one DiscussionGroup
     * const discussionGroup = await prisma.discussionGroup.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DiscussionGroupFindFirstArgs>(args?: SelectSubset<T, DiscussionGroupFindFirstArgs<ExtArgs>>): Prisma__DiscussionGroupClient<$Result.GetResult<Prisma.$DiscussionGroupPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DiscussionGroup that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DiscussionGroupFindFirstOrThrowArgs} args - Arguments to find a DiscussionGroup
     * @example
     * // Get one DiscussionGroup
     * const discussionGroup = await prisma.discussionGroup.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DiscussionGroupFindFirstOrThrowArgs>(args?: SelectSubset<T, DiscussionGroupFindFirstOrThrowArgs<ExtArgs>>): Prisma__DiscussionGroupClient<$Result.GetResult<Prisma.$DiscussionGroupPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more DiscussionGroups that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DiscussionGroupFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DiscussionGroups
     * const discussionGroups = await prisma.discussionGroup.findMany()
     * 
     * // Get first 10 DiscussionGroups
     * const discussionGroups = await prisma.discussionGroup.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const discussionGroupWithIdOnly = await prisma.discussionGroup.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DiscussionGroupFindManyArgs>(args?: SelectSubset<T, DiscussionGroupFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DiscussionGroupPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a DiscussionGroup.
     * @param {DiscussionGroupCreateArgs} args - Arguments to create a DiscussionGroup.
     * @example
     * // Create one DiscussionGroup
     * const DiscussionGroup = await prisma.discussionGroup.create({
     *   data: {
     *     // ... data to create a DiscussionGroup
     *   }
     * })
     * 
     */
    create<T extends DiscussionGroupCreateArgs>(args: SelectSubset<T, DiscussionGroupCreateArgs<ExtArgs>>): Prisma__DiscussionGroupClient<$Result.GetResult<Prisma.$DiscussionGroupPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many DiscussionGroups.
     * @param {DiscussionGroupCreateManyArgs} args - Arguments to create many DiscussionGroups.
     * @example
     * // Create many DiscussionGroups
     * const discussionGroup = await prisma.discussionGroup.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DiscussionGroupCreateManyArgs>(args?: SelectSubset<T, DiscussionGroupCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many DiscussionGroups and returns the data saved in the database.
     * @param {DiscussionGroupCreateManyAndReturnArgs} args - Arguments to create many DiscussionGroups.
     * @example
     * // Create many DiscussionGroups
     * const discussionGroup = await prisma.discussionGroup.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many DiscussionGroups and only return the `id`
     * const discussionGroupWithIdOnly = await prisma.discussionGroup.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DiscussionGroupCreateManyAndReturnArgs>(args?: SelectSubset<T, DiscussionGroupCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DiscussionGroupPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a DiscussionGroup.
     * @param {DiscussionGroupDeleteArgs} args - Arguments to delete one DiscussionGroup.
     * @example
     * // Delete one DiscussionGroup
     * const DiscussionGroup = await prisma.discussionGroup.delete({
     *   where: {
     *     // ... filter to delete one DiscussionGroup
     *   }
     * })
     * 
     */
    delete<T extends DiscussionGroupDeleteArgs>(args: SelectSubset<T, DiscussionGroupDeleteArgs<ExtArgs>>): Prisma__DiscussionGroupClient<$Result.GetResult<Prisma.$DiscussionGroupPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one DiscussionGroup.
     * @param {DiscussionGroupUpdateArgs} args - Arguments to update one DiscussionGroup.
     * @example
     * // Update one DiscussionGroup
     * const discussionGroup = await prisma.discussionGroup.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DiscussionGroupUpdateArgs>(args: SelectSubset<T, DiscussionGroupUpdateArgs<ExtArgs>>): Prisma__DiscussionGroupClient<$Result.GetResult<Prisma.$DiscussionGroupPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more DiscussionGroups.
     * @param {DiscussionGroupDeleteManyArgs} args - Arguments to filter DiscussionGroups to delete.
     * @example
     * // Delete a few DiscussionGroups
     * const { count } = await prisma.discussionGroup.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DiscussionGroupDeleteManyArgs>(args?: SelectSubset<T, DiscussionGroupDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DiscussionGroups.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DiscussionGroupUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DiscussionGroups
     * const discussionGroup = await prisma.discussionGroup.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DiscussionGroupUpdateManyArgs>(args: SelectSubset<T, DiscussionGroupUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DiscussionGroups and returns the data updated in the database.
     * @param {DiscussionGroupUpdateManyAndReturnArgs} args - Arguments to update many DiscussionGroups.
     * @example
     * // Update many DiscussionGroups
     * const discussionGroup = await prisma.discussionGroup.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more DiscussionGroups and only return the `id`
     * const discussionGroupWithIdOnly = await prisma.discussionGroup.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DiscussionGroupUpdateManyAndReturnArgs>(args: SelectSubset<T, DiscussionGroupUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DiscussionGroupPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one DiscussionGroup.
     * @param {DiscussionGroupUpsertArgs} args - Arguments to update or create a DiscussionGroup.
     * @example
     * // Update or create a DiscussionGroup
     * const discussionGroup = await prisma.discussionGroup.upsert({
     *   create: {
     *     // ... data to create a DiscussionGroup
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DiscussionGroup we want to update
     *   }
     * })
     */
    upsert<T extends DiscussionGroupUpsertArgs>(args: SelectSubset<T, DiscussionGroupUpsertArgs<ExtArgs>>): Prisma__DiscussionGroupClient<$Result.GetResult<Prisma.$DiscussionGroupPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of DiscussionGroups.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DiscussionGroupCountArgs} args - Arguments to filter DiscussionGroups to count.
     * @example
     * // Count the number of DiscussionGroups
     * const count = await prisma.discussionGroup.count({
     *   where: {
     *     // ... the filter for the DiscussionGroups we want to count
     *   }
     * })
    **/
    count<T extends DiscussionGroupCountArgs>(
      args?: Subset<T, DiscussionGroupCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DiscussionGroupCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DiscussionGroup.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DiscussionGroupAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DiscussionGroupAggregateArgs>(args: Subset<T, DiscussionGroupAggregateArgs>): Prisma.PrismaPromise<GetDiscussionGroupAggregateType<T>>

    /**
     * Group by DiscussionGroup.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DiscussionGroupGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DiscussionGroupGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DiscussionGroupGroupByArgs['orderBy'] }
        : { orderBy?: DiscussionGroupGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DiscussionGroupGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDiscussionGroupGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DiscussionGroup model
   */
  readonly fields: DiscussionGroupFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DiscussionGroup.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DiscussionGroupClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    sections<T extends DiscussionGroup$sectionsArgs<ExtArgs> = {}>(args?: Subset<T, DiscussionGroup$sectionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SectionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    course<T extends CourseDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CourseDefaultArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the DiscussionGroup model
   */
  interface DiscussionGroupFieldRefs {
    readonly id: FieldRef<"DiscussionGroup", 'Int'>
    readonly courseId: FieldRef<"DiscussionGroup", 'Int'>
    readonly term: FieldRef<"DiscussionGroup", 'String'>
  }
    

  // Custom InputTypes
  /**
   * DiscussionGroup findUnique
   */
  export type DiscussionGroupFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiscussionGroup
     */
    select?: DiscussionGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DiscussionGroup
     */
    omit?: DiscussionGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiscussionGroupInclude<ExtArgs> | null
    /**
     * Filter, which DiscussionGroup to fetch.
     */
    where: DiscussionGroupWhereUniqueInput
  }

  /**
   * DiscussionGroup findUniqueOrThrow
   */
  export type DiscussionGroupFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiscussionGroup
     */
    select?: DiscussionGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DiscussionGroup
     */
    omit?: DiscussionGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiscussionGroupInclude<ExtArgs> | null
    /**
     * Filter, which DiscussionGroup to fetch.
     */
    where: DiscussionGroupWhereUniqueInput
  }

  /**
   * DiscussionGroup findFirst
   */
  export type DiscussionGroupFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiscussionGroup
     */
    select?: DiscussionGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DiscussionGroup
     */
    omit?: DiscussionGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiscussionGroupInclude<ExtArgs> | null
    /**
     * Filter, which DiscussionGroup to fetch.
     */
    where?: DiscussionGroupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DiscussionGroups to fetch.
     */
    orderBy?: DiscussionGroupOrderByWithRelationInput | DiscussionGroupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DiscussionGroups.
     */
    cursor?: DiscussionGroupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DiscussionGroups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DiscussionGroups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DiscussionGroups.
     */
    distinct?: DiscussionGroupScalarFieldEnum | DiscussionGroupScalarFieldEnum[]
  }

  /**
   * DiscussionGroup findFirstOrThrow
   */
  export type DiscussionGroupFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiscussionGroup
     */
    select?: DiscussionGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DiscussionGroup
     */
    omit?: DiscussionGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiscussionGroupInclude<ExtArgs> | null
    /**
     * Filter, which DiscussionGroup to fetch.
     */
    where?: DiscussionGroupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DiscussionGroups to fetch.
     */
    orderBy?: DiscussionGroupOrderByWithRelationInput | DiscussionGroupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DiscussionGroups.
     */
    cursor?: DiscussionGroupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DiscussionGroups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DiscussionGroups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DiscussionGroups.
     */
    distinct?: DiscussionGroupScalarFieldEnum | DiscussionGroupScalarFieldEnum[]
  }

  /**
   * DiscussionGroup findMany
   */
  export type DiscussionGroupFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiscussionGroup
     */
    select?: DiscussionGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DiscussionGroup
     */
    omit?: DiscussionGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiscussionGroupInclude<ExtArgs> | null
    /**
     * Filter, which DiscussionGroups to fetch.
     */
    where?: DiscussionGroupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DiscussionGroups to fetch.
     */
    orderBy?: DiscussionGroupOrderByWithRelationInput | DiscussionGroupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DiscussionGroups.
     */
    cursor?: DiscussionGroupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DiscussionGroups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DiscussionGroups.
     */
    skip?: number
    distinct?: DiscussionGroupScalarFieldEnum | DiscussionGroupScalarFieldEnum[]
  }

  /**
   * DiscussionGroup create
   */
  export type DiscussionGroupCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiscussionGroup
     */
    select?: DiscussionGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DiscussionGroup
     */
    omit?: DiscussionGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiscussionGroupInclude<ExtArgs> | null
    /**
     * The data needed to create a DiscussionGroup.
     */
    data: XOR<DiscussionGroupCreateInput, DiscussionGroupUncheckedCreateInput>
  }

  /**
   * DiscussionGroup createMany
   */
  export type DiscussionGroupCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DiscussionGroups.
     */
    data: DiscussionGroupCreateManyInput | DiscussionGroupCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DiscussionGroup createManyAndReturn
   */
  export type DiscussionGroupCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiscussionGroup
     */
    select?: DiscussionGroupSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DiscussionGroup
     */
    omit?: DiscussionGroupOmit<ExtArgs> | null
    /**
     * The data used to create many DiscussionGroups.
     */
    data: DiscussionGroupCreateManyInput | DiscussionGroupCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiscussionGroupIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * DiscussionGroup update
   */
  export type DiscussionGroupUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiscussionGroup
     */
    select?: DiscussionGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DiscussionGroup
     */
    omit?: DiscussionGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiscussionGroupInclude<ExtArgs> | null
    /**
     * The data needed to update a DiscussionGroup.
     */
    data: XOR<DiscussionGroupUpdateInput, DiscussionGroupUncheckedUpdateInput>
    /**
     * Choose, which DiscussionGroup to update.
     */
    where: DiscussionGroupWhereUniqueInput
  }

  /**
   * DiscussionGroup updateMany
   */
  export type DiscussionGroupUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DiscussionGroups.
     */
    data: XOR<DiscussionGroupUpdateManyMutationInput, DiscussionGroupUncheckedUpdateManyInput>
    /**
     * Filter which DiscussionGroups to update
     */
    where?: DiscussionGroupWhereInput
    /**
     * Limit how many DiscussionGroups to update.
     */
    limit?: number
  }

  /**
   * DiscussionGroup updateManyAndReturn
   */
  export type DiscussionGroupUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiscussionGroup
     */
    select?: DiscussionGroupSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DiscussionGroup
     */
    omit?: DiscussionGroupOmit<ExtArgs> | null
    /**
     * The data used to update DiscussionGroups.
     */
    data: XOR<DiscussionGroupUpdateManyMutationInput, DiscussionGroupUncheckedUpdateManyInput>
    /**
     * Filter which DiscussionGroups to update
     */
    where?: DiscussionGroupWhereInput
    /**
     * Limit how many DiscussionGroups to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiscussionGroupIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * DiscussionGroup upsert
   */
  export type DiscussionGroupUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiscussionGroup
     */
    select?: DiscussionGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DiscussionGroup
     */
    omit?: DiscussionGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiscussionGroupInclude<ExtArgs> | null
    /**
     * The filter to search for the DiscussionGroup to update in case it exists.
     */
    where: DiscussionGroupWhereUniqueInput
    /**
     * In case the DiscussionGroup found by the `where` argument doesn't exist, create a new DiscussionGroup with this data.
     */
    create: XOR<DiscussionGroupCreateInput, DiscussionGroupUncheckedCreateInput>
    /**
     * In case the DiscussionGroup was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DiscussionGroupUpdateInput, DiscussionGroupUncheckedUpdateInput>
  }

  /**
   * DiscussionGroup delete
   */
  export type DiscussionGroupDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiscussionGroup
     */
    select?: DiscussionGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DiscussionGroup
     */
    omit?: DiscussionGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiscussionGroupInclude<ExtArgs> | null
    /**
     * Filter which DiscussionGroup to delete.
     */
    where: DiscussionGroupWhereUniqueInput
  }

  /**
   * DiscussionGroup deleteMany
   */
  export type DiscussionGroupDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DiscussionGroups to delete
     */
    where?: DiscussionGroupWhereInput
    /**
     * Limit how many DiscussionGroups to delete.
     */
    limit?: number
  }

  /**
   * DiscussionGroup.sections
   */
  export type DiscussionGroup$sectionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Section
     */
    select?: SectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Section
     */
    omit?: SectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SectionInclude<ExtArgs> | null
    where?: SectionWhereInput
    orderBy?: SectionOrderByWithRelationInput | SectionOrderByWithRelationInput[]
    cursor?: SectionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SectionScalarFieldEnum | SectionScalarFieldEnum[]
  }

  /**
   * DiscussionGroup without action
   */
  export type DiscussionGroupDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiscussionGroup
     */
    select?: DiscussionGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DiscussionGroup
     */
    omit?: DiscussionGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiscussionGroupInclude<ExtArgs> | null
  }


  /**
   * Model Section
   */

  export type AggregateSection = {
    _count: SectionCountAggregateOutputType | null
    _avg: SectionAvgAggregateOutputType | null
    _sum: SectionSumAggregateOutputType | null
    _min: SectionMinAggregateOutputType | null
    _max: SectionMaxAggregateOutputType | null
  }

  export type SectionAvgAggregateOutputType = {
    id: number | null
    courseId: number | null
    discussionGroupId: number | null
  }

  export type SectionSumAggregateOutputType = {
    id: number | null
    courseId: number | null
    discussionGroupId: number | null
  }

  export type SectionMinAggregateOutputType = {
    id: number | null
    sectionNumber: string | null
    classNumber: string | null
    term: string | null
    isAsync: boolean | null
    courseId: number | null
    discussionGroupId: number | null
    type: string | null
  }

  export type SectionMaxAggregateOutputType = {
    id: number | null
    sectionNumber: string | null
    classNumber: string | null
    term: string | null
    isAsync: boolean | null
    courseId: number | null
    discussionGroupId: number | null
    type: string | null
  }

  export type SectionCountAggregateOutputType = {
    id: number
    sectionNumber: number
    classNumber: number
    term: number
    isAsync: number
    courseId: number
    discussionGroupId: number
    type: number
    _all: number
  }


  export type SectionAvgAggregateInputType = {
    id?: true
    courseId?: true
    discussionGroupId?: true
  }

  export type SectionSumAggregateInputType = {
    id?: true
    courseId?: true
    discussionGroupId?: true
  }

  export type SectionMinAggregateInputType = {
    id?: true
    sectionNumber?: true
    classNumber?: true
    term?: true
    isAsync?: true
    courseId?: true
    discussionGroupId?: true
    type?: true
  }

  export type SectionMaxAggregateInputType = {
    id?: true
    sectionNumber?: true
    classNumber?: true
    term?: true
    isAsync?: true
    courseId?: true
    discussionGroupId?: true
    type?: true
  }

  export type SectionCountAggregateInputType = {
    id?: true
    sectionNumber?: true
    classNumber?: true
    term?: true
    isAsync?: true
    courseId?: true
    discussionGroupId?: true
    type?: true
    _all?: true
  }

  export type SectionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Section to aggregate.
     */
    where?: SectionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sections to fetch.
     */
    orderBy?: SectionOrderByWithRelationInput | SectionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SectionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sections.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Sections
    **/
    _count?: true | SectionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SectionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SectionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SectionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SectionMaxAggregateInputType
  }

  export type GetSectionAggregateType<T extends SectionAggregateArgs> = {
        [P in keyof T & keyof AggregateSection]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSection[P]>
      : GetScalarType<T[P], AggregateSection[P]>
  }




  export type SectionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SectionWhereInput
    orderBy?: SectionOrderByWithAggregationInput | SectionOrderByWithAggregationInput[]
    by: SectionScalarFieldEnum[] | SectionScalarFieldEnum
    having?: SectionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SectionCountAggregateInputType | true
    _avg?: SectionAvgAggregateInputType
    _sum?: SectionSumAggregateInputType
    _min?: SectionMinAggregateInputType
    _max?: SectionMaxAggregateInputType
  }

  export type SectionGroupByOutputType = {
    id: number
    sectionNumber: string
    classNumber: string
    term: string
    isAsync: boolean
    courseId: number
    discussionGroupId: number | null
    type: string
    _count: SectionCountAggregateOutputType | null
    _avg: SectionAvgAggregateOutputType | null
    _sum: SectionSumAggregateOutputType | null
    _min: SectionMinAggregateOutputType | null
    _max: SectionMaxAggregateOutputType | null
  }

  type GetSectionGroupByPayload<T extends SectionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SectionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SectionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SectionGroupByOutputType[P]>
            : GetScalarType<T[P], SectionGroupByOutputType[P]>
        }
      >
    >


  export type SectionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sectionNumber?: boolean
    classNumber?: boolean
    term?: boolean
    isAsync?: boolean
    courseId?: boolean
    discussionGroupId?: boolean
    type?: boolean
    meetings?: boolean | Section$meetingsArgs<ExtArgs>
    instructors?: boolean | Section$instructorsArgs<ExtArgs>
    course?: boolean | CourseDefaultArgs<ExtArgs>
    discussionGroup?: boolean | Section$discussionGroupArgs<ExtArgs>
    _count?: boolean | SectionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["section"]>

  export type SectionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sectionNumber?: boolean
    classNumber?: boolean
    term?: boolean
    isAsync?: boolean
    courseId?: boolean
    discussionGroupId?: boolean
    type?: boolean
    course?: boolean | CourseDefaultArgs<ExtArgs>
    discussionGroup?: boolean | Section$discussionGroupArgs<ExtArgs>
  }, ExtArgs["result"]["section"]>

  export type SectionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sectionNumber?: boolean
    classNumber?: boolean
    term?: boolean
    isAsync?: boolean
    courseId?: boolean
    discussionGroupId?: boolean
    type?: boolean
    course?: boolean | CourseDefaultArgs<ExtArgs>
    discussionGroup?: boolean | Section$discussionGroupArgs<ExtArgs>
  }, ExtArgs["result"]["section"]>

  export type SectionSelectScalar = {
    id?: boolean
    sectionNumber?: boolean
    classNumber?: boolean
    term?: boolean
    isAsync?: boolean
    courseId?: boolean
    discussionGroupId?: boolean
    type?: boolean
  }

  export type SectionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "sectionNumber" | "classNumber" | "term" | "isAsync" | "courseId" | "discussionGroupId" | "type", ExtArgs["result"]["section"]>
  export type SectionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    meetings?: boolean | Section$meetingsArgs<ExtArgs>
    instructors?: boolean | Section$instructorsArgs<ExtArgs>
    course?: boolean | CourseDefaultArgs<ExtArgs>
    discussionGroup?: boolean | Section$discussionGroupArgs<ExtArgs>
    _count?: boolean | SectionCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type SectionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    course?: boolean | CourseDefaultArgs<ExtArgs>
    discussionGroup?: boolean | Section$discussionGroupArgs<ExtArgs>
  }
  export type SectionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    course?: boolean | CourseDefaultArgs<ExtArgs>
    discussionGroup?: boolean | Section$discussionGroupArgs<ExtArgs>
  }

  export type $SectionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Section"
    objects: {
      meetings: Prisma.$MeetingPayload<ExtArgs>[]
      instructors: Prisma.$InstructorPayload<ExtArgs>[]
      course: Prisma.$CoursePayload<ExtArgs>
      discussionGroup: Prisma.$DiscussionGroupPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      sectionNumber: string
      classNumber: string
      term: string
      isAsync: boolean
      courseId: number
      discussionGroupId: number | null
      type: string
    }, ExtArgs["result"]["section"]>
    composites: {}
  }

  type SectionGetPayload<S extends boolean | null | undefined | SectionDefaultArgs> = $Result.GetResult<Prisma.$SectionPayload, S>

  type SectionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SectionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SectionCountAggregateInputType | true
    }

  export interface SectionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Section'], meta: { name: 'Section' } }
    /**
     * Find zero or one Section that matches the filter.
     * @param {SectionFindUniqueArgs} args - Arguments to find a Section
     * @example
     * // Get one Section
     * const section = await prisma.section.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SectionFindUniqueArgs>(args: SelectSubset<T, SectionFindUniqueArgs<ExtArgs>>): Prisma__SectionClient<$Result.GetResult<Prisma.$SectionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Section that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SectionFindUniqueOrThrowArgs} args - Arguments to find a Section
     * @example
     * // Get one Section
     * const section = await prisma.section.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SectionFindUniqueOrThrowArgs>(args: SelectSubset<T, SectionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SectionClient<$Result.GetResult<Prisma.$SectionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Section that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SectionFindFirstArgs} args - Arguments to find a Section
     * @example
     * // Get one Section
     * const section = await prisma.section.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SectionFindFirstArgs>(args?: SelectSubset<T, SectionFindFirstArgs<ExtArgs>>): Prisma__SectionClient<$Result.GetResult<Prisma.$SectionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Section that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SectionFindFirstOrThrowArgs} args - Arguments to find a Section
     * @example
     * // Get one Section
     * const section = await prisma.section.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SectionFindFirstOrThrowArgs>(args?: SelectSubset<T, SectionFindFirstOrThrowArgs<ExtArgs>>): Prisma__SectionClient<$Result.GetResult<Prisma.$SectionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Sections that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SectionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sections
     * const sections = await prisma.section.findMany()
     * 
     * // Get first 10 Sections
     * const sections = await prisma.section.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sectionWithIdOnly = await prisma.section.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SectionFindManyArgs>(args?: SelectSubset<T, SectionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SectionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Section.
     * @param {SectionCreateArgs} args - Arguments to create a Section.
     * @example
     * // Create one Section
     * const Section = await prisma.section.create({
     *   data: {
     *     // ... data to create a Section
     *   }
     * })
     * 
     */
    create<T extends SectionCreateArgs>(args: SelectSubset<T, SectionCreateArgs<ExtArgs>>): Prisma__SectionClient<$Result.GetResult<Prisma.$SectionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Sections.
     * @param {SectionCreateManyArgs} args - Arguments to create many Sections.
     * @example
     * // Create many Sections
     * const section = await prisma.section.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SectionCreateManyArgs>(args?: SelectSubset<T, SectionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Sections and returns the data saved in the database.
     * @param {SectionCreateManyAndReturnArgs} args - Arguments to create many Sections.
     * @example
     * // Create many Sections
     * const section = await prisma.section.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Sections and only return the `id`
     * const sectionWithIdOnly = await prisma.section.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SectionCreateManyAndReturnArgs>(args?: SelectSubset<T, SectionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SectionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Section.
     * @param {SectionDeleteArgs} args - Arguments to delete one Section.
     * @example
     * // Delete one Section
     * const Section = await prisma.section.delete({
     *   where: {
     *     // ... filter to delete one Section
     *   }
     * })
     * 
     */
    delete<T extends SectionDeleteArgs>(args: SelectSubset<T, SectionDeleteArgs<ExtArgs>>): Prisma__SectionClient<$Result.GetResult<Prisma.$SectionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Section.
     * @param {SectionUpdateArgs} args - Arguments to update one Section.
     * @example
     * // Update one Section
     * const section = await prisma.section.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SectionUpdateArgs>(args: SelectSubset<T, SectionUpdateArgs<ExtArgs>>): Prisma__SectionClient<$Result.GetResult<Prisma.$SectionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Sections.
     * @param {SectionDeleteManyArgs} args - Arguments to filter Sections to delete.
     * @example
     * // Delete a few Sections
     * const { count } = await prisma.section.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SectionDeleteManyArgs>(args?: SelectSubset<T, SectionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sections.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SectionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sections
     * const section = await prisma.section.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SectionUpdateManyArgs>(args: SelectSubset<T, SectionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sections and returns the data updated in the database.
     * @param {SectionUpdateManyAndReturnArgs} args - Arguments to update many Sections.
     * @example
     * // Update many Sections
     * const section = await prisma.section.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Sections and only return the `id`
     * const sectionWithIdOnly = await prisma.section.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SectionUpdateManyAndReturnArgs>(args: SelectSubset<T, SectionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SectionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Section.
     * @param {SectionUpsertArgs} args - Arguments to update or create a Section.
     * @example
     * // Update or create a Section
     * const section = await prisma.section.upsert({
     *   create: {
     *     // ... data to create a Section
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Section we want to update
     *   }
     * })
     */
    upsert<T extends SectionUpsertArgs>(args: SelectSubset<T, SectionUpsertArgs<ExtArgs>>): Prisma__SectionClient<$Result.GetResult<Prisma.$SectionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Sections.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SectionCountArgs} args - Arguments to filter Sections to count.
     * @example
     * // Count the number of Sections
     * const count = await prisma.section.count({
     *   where: {
     *     // ... the filter for the Sections we want to count
     *   }
     * })
    **/
    count<T extends SectionCountArgs>(
      args?: Subset<T, SectionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SectionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Section.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SectionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SectionAggregateArgs>(args: Subset<T, SectionAggregateArgs>): Prisma.PrismaPromise<GetSectionAggregateType<T>>

    /**
     * Group by Section.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SectionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SectionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SectionGroupByArgs['orderBy'] }
        : { orderBy?: SectionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SectionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSectionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Section model
   */
  readonly fields: SectionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Section.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SectionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    meetings<T extends Section$meetingsArgs<ExtArgs> = {}>(args?: Subset<T, Section$meetingsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MeetingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    instructors<T extends Section$instructorsArgs<ExtArgs> = {}>(args?: Subset<T, Section$instructorsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InstructorPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    course<T extends CourseDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CourseDefaultArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    discussionGroup<T extends Section$discussionGroupArgs<ExtArgs> = {}>(args?: Subset<T, Section$discussionGroupArgs<ExtArgs>>): Prisma__DiscussionGroupClient<$Result.GetResult<Prisma.$DiscussionGroupPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Section model
   */
  interface SectionFieldRefs {
    readonly id: FieldRef<"Section", 'Int'>
    readonly sectionNumber: FieldRef<"Section", 'String'>
    readonly classNumber: FieldRef<"Section", 'String'>
    readonly term: FieldRef<"Section", 'String'>
    readonly isAsync: FieldRef<"Section", 'Boolean'>
    readonly courseId: FieldRef<"Section", 'Int'>
    readonly discussionGroupId: FieldRef<"Section", 'Int'>
    readonly type: FieldRef<"Section", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Section findUnique
   */
  export type SectionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Section
     */
    select?: SectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Section
     */
    omit?: SectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SectionInclude<ExtArgs> | null
    /**
     * Filter, which Section to fetch.
     */
    where: SectionWhereUniqueInput
  }

  /**
   * Section findUniqueOrThrow
   */
  export type SectionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Section
     */
    select?: SectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Section
     */
    omit?: SectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SectionInclude<ExtArgs> | null
    /**
     * Filter, which Section to fetch.
     */
    where: SectionWhereUniqueInput
  }

  /**
   * Section findFirst
   */
  export type SectionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Section
     */
    select?: SectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Section
     */
    omit?: SectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SectionInclude<ExtArgs> | null
    /**
     * Filter, which Section to fetch.
     */
    where?: SectionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sections to fetch.
     */
    orderBy?: SectionOrderByWithRelationInput | SectionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sections.
     */
    cursor?: SectionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sections.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sections.
     */
    distinct?: SectionScalarFieldEnum | SectionScalarFieldEnum[]
  }

  /**
   * Section findFirstOrThrow
   */
  export type SectionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Section
     */
    select?: SectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Section
     */
    omit?: SectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SectionInclude<ExtArgs> | null
    /**
     * Filter, which Section to fetch.
     */
    where?: SectionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sections to fetch.
     */
    orderBy?: SectionOrderByWithRelationInput | SectionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sections.
     */
    cursor?: SectionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sections.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sections.
     */
    distinct?: SectionScalarFieldEnum | SectionScalarFieldEnum[]
  }

  /**
   * Section findMany
   */
  export type SectionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Section
     */
    select?: SectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Section
     */
    omit?: SectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SectionInclude<ExtArgs> | null
    /**
     * Filter, which Sections to fetch.
     */
    where?: SectionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sections to fetch.
     */
    orderBy?: SectionOrderByWithRelationInput | SectionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Sections.
     */
    cursor?: SectionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sections.
     */
    skip?: number
    distinct?: SectionScalarFieldEnum | SectionScalarFieldEnum[]
  }

  /**
   * Section create
   */
  export type SectionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Section
     */
    select?: SectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Section
     */
    omit?: SectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SectionInclude<ExtArgs> | null
    /**
     * The data needed to create a Section.
     */
    data: XOR<SectionCreateInput, SectionUncheckedCreateInput>
  }

  /**
   * Section createMany
   */
  export type SectionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Sections.
     */
    data: SectionCreateManyInput | SectionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Section createManyAndReturn
   */
  export type SectionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Section
     */
    select?: SectionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Section
     */
    omit?: SectionOmit<ExtArgs> | null
    /**
     * The data used to create many Sections.
     */
    data: SectionCreateManyInput | SectionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SectionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Section update
   */
  export type SectionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Section
     */
    select?: SectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Section
     */
    omit?: SectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SectionInclude<ExtArgs> | null
    /**
     * The data needed to update a Section.
     */
    data: XOR<SectionUpdateInput, SectionUncheckedUpdateInput>
    /**
     * Choose, which Section to update.
     */
    where: SectionWhereUniqueInput
  }

  /**
   * Section updateMany
   */
  export type SectionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Sections.
     */
    data: XOR<SectionUpdateManyMutationInput, SectionUncheckedUpdateManyInput>
    /**
     * Filter which Sections to update
     */
    where?: SectionWhereInput
    /**
     * Limit how many Sections to update.
     */
    limit?: number
  }

  /**
   * Section updateManyAndReturn
   */
  export type SectionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Section
     */
    select?: SectionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Section
     */
    omit?: SectionOmit<ExtArgs> | null
    /**
     * The data used to update Sections.
     */
    data: XOR<SectionUpdateManyMutationInput, SectionUncheckedUpdateManyInput>
    /**
     * Filter which Sections to update
     */
    where?: SectionWhereInput
    /**
     * Limit how many Sections to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SectionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Section upsert
   */
  export type SectionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Section
     */
    select?: SectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Section
     */
    omit?: SectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SectionInclude<ExtArgs> | null
    /**
     * The filter to search for the Section to update in case it exists.
     */
    where: SectionWhereUniqueInput
    /**
     * In case the Section found by the `where` argument doesn't exist, create a new Section with this data.
     */
    create: XOR<SectionCreateInput, SectionUncheckedCreateInput>
    /**
     * In case the Section was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SectionUpdateInput, SectionUncheckedUpdateInput>
  }

  /**
   * Section delete
   */
  export type SectionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Section
     */
    select?: SectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Section
     */
    omit?: SectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SectionInclude<ExtArgs> | null
    /**
     * Filter which Section to delete.
     */
    where: SectionWhereUniqueInput
  }

  /**
   * Section deleteMany
   */
  export type SectionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sections to delete
     */
    where?: SectionWhereInput
    /**
     * Limit how many Sections to delete.
     */
    limit?: number
  }

  /**
   * Section.meetings
   */
  export type Section$meetingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Meeting
     */
    select?: MeetingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Meeting
     */
    omit?: MeetingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MeetingInclude<ExtArgs> | null
    where?: MeetingWhereInput
    orderBy?: MeetingOrderByWithRelationInput | MeetingOrderByWithRelationInput[]
    cursor?: MeetingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MeetingScalarFieldEnum | MeetingScalarFieldEnum[]
  }

  /**
   * Section.instructors
   */
  export type Section$instructorsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Instructor
     */
    select?: InstructorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Instructor
     */
    omit?: InstructorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstructorInclude<ExtArgs> | null
    where?: InstructorWhereInput
    orderBy?: InstructorOrderByWithRelationInput | InstructorOrderByWithRelationInput[]
    cursor?: InstructorWhereUniqueInput
    take?: number
    skip?: number
    distinct?: InstructorScalarFieldEnum | InstructorScalarFieldEnum[]
  }

  /**
   * Section.discussionGroup
   */
  export type Section$discussionGroupArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiscussionGroup
     */
    select?: DiscussionGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DiscussionGroup
     */
    omit?: DiscussionGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiscussionGroupInclude<ExtArgs> | null
    where?: DiscussionGroupWhereInput
  }

  /**
   * Section without action
   */
  export type SectionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Section
     */
    select?: SectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Section
     */
    omit?: SectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SectionInclude<ExtArgs> | null
  }


  /**
   * Model Meeting
   */

  export type AggregateMeeting = {
    _count: MeetingCountAggregateOutputType | null
    _avg: MeetingAvgAggregateOutputType | null
    _sum: MeetingSumAggregateOutputType | null
    _min: MeetingMinAggregateOutputType | null
    _max: MeetingMaxAggregateOutputType | null
  }

  export type MeetingAvgAggregateOutputType = {
    id: number | null
    sectionId: number | null
  }

  export type MeetingSumAggregateOutputType = {
    id: number | null
    sectionId: number | null
  }

  export type MeetingMinAggregateOutputType = {
    id: number | null
    day: $Enums.Day | null
    startTime: Date | null
    endTime: Date | null
    location: string | null
    sectionId: number | null
  }

  export type MeetingMaxAggregateOutputType = {
    id: number | null
    day: $Enums.Day | null
    startTime: Date | null
    endTime: Date | null
    location: string | null
    sectionId: number | null
  }

  export type MeetingCountAggregateOutputType = {
    id: number
    day: number
    startTime: number
    endTime: number
    location: number
    sectionId: number
    _all: number
  }


  export type MeetingAvgAggregateInputType = {
    id?: true
    sectionId?: true
  }

  export type MeetingSumAggregateInputType = {
    id?: true
    sectionId?: true
  }

  export type MeetingMinAggregateInputType = {
    id?: true
    day?: true
    startTime?: true
    endTime?: true
    location?: true
    sectionId?: true
  }

  export type MeetingMaxAggregateInputType = {
    id?: true
    day?: true
    startTime?: true
    endTime?: true
    location?: true
    sectionId?: true
  }

  export type MeetingCountAggregateInputType = {
    id?: true
    day?: true
    startTime?: true
    endTime?: true
    location?: true
    sectionId?: true
    _all?: true
  }

  export type MeetingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Meeting to aggregate.
     */
    where?: MeetingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Meetings to fetch.
     */
    orderBy?: MeetingOrderByWithRelationInput | MeetingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MeetingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Meetings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Meetings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Meetings
    **/
    _count?: true | MeetingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MeetingAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MeetingSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MeetingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MeetingMaxAggregateInputType
  }

  export type GetMeetingAggregateType<T extends MeetingAggregateArgs> = {
        [P in keyof T & keyof AggregateMeeting]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMeeting[P]>
      : GetScalarType<T[P], AggregateMeeting[P]>
  }




  export type MeetingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MeetingWhereInput
    orderBy?: MeetingOrderByWithAggregationInput | MeetingOrderByWithAggregationInput[]
    by: MeetingScalarFieldEnum[] | MeetingScalarFieldEnum
    having?: MeetingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MeetingCountAggregateInputType | true
    _avg?: MeetingAvgAggregateInputType
    _sum?: MeetingSumAggregateInputType
    _min?: MeetingMinAggregateInputType
    _max?: MeetingMaxAggregateInputType
  }

  export type MeetingGroupByOutputType = {
    id: number
    day: $Enums.Day
    startTime: Date
    endTime: Date
    location: string | null
    sectionId: number
    _count: MeetingCountAggregateOutputType | null
    _avg: MeetingAvgAggregateOutputType | null
    _sum: MeetingSumAggregateOutputType | null
    _min: MeetingMinAggregateOutputType | null
    _max: MeetingMaxAggregateOutputType | null
  }

  type GetMeetingGroupByPayload<T extends MeetingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MeetingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MeetingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MeetingGroupByOutputType[P]>
            : GetScalarType<T[P], MeetingGroupByOutputType[P]>
        }
      >
    >


  export type MeetingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    day?: boolean
    startTime?: boolean
    endTime?: boolean
    location?: boolean
    sectionId?: boolean
    section?: boolean | SectionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["meeting"]>

  export type MeetingSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    day?: boolean
    startTime?: boolean
    endTime?: boolean
    location?: boolean
    sectionId?: boolean
    section?: boolean | SectionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["meeting"]>

  export type MeetingSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    day?: boolean
    startTime?: boolean
    endTime?: boolean
    location?: boolean
    sectionId?: boolean
    section?: boolean | SectionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["meeting"]>

  export type MeetingSelectScalar = {
    id?: boolean
    day?: boolean
    startTime?: boolean
    endTime?: boolean
    location?: boolean
    sectionId?: boolean
  }

  export type MeetingOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "day" | "startTime" | "endTime" | "location" | "sectionId", ExtArgs["result"]["meeting"]>
  export type MeetingInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    section?: boolean | SectionDefaultArgs<ExtArgs>
  }
  export type MeetingIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    section?: boolean | SectionDefaultArgs<ExtArgs>
  }
  export type MeetingIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    section?: boolean | SectionDefaultArgs<ExtArgs>
  }

  export type $MeetingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Meeting"
    objects: {
      section: Prisma.$SectionPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      day: $Enums.Day
      startTime: Date
      endTime: Date
      location: string | null
      sectionId: number
    }, ExtArgs["result"]["meeting"]>
    composites: {}
  }

  type MeetingGetPayload<S extends boolean | null | undefined | MeetingDefaultArgs> = $Result.GetResult<Prisma.$MeetingPayload, S>

  type MeetingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MeetingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MeetingCountAggregateInputType | true
    }

  export interface MeetingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Meeting'], meta: { name: 'Meeting' } }
    /**
     * Find zero or one Meeting that matches the filter.
     * @param {MeetingFindUniqueArgs} args - Arguments to find a Meeting
     * @example
     * // Get one Meeting
     * const meeting = await prisma.meeting.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MeetingFindUniqueArgs>(args: SelectSubset<T, MeetingFindUniqueArgs<ExtArgs>>): Prisma__MeetingClient<$Result.GetResult<Prisma.$MeetingPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Meeting that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MeetingFindUniqueOrThrowArgs} args - Arguments to find a Meeting
     * @example
     * // Get one Meeting
     * const meeting = await prisma.meeting.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MeetingFindUniqueOrThrowArgs>(args: SelectSubset<T, MeetingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MeetingClient<$Result.GetResult<Prisma.$MeetingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Meeting that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MeetingFindFirstArgs} args - Arguments to find a Meeting
     * @example
     * // Get one Meeting
     * const meeting = await prisma.meeting.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MeetingFindFirstArgs>(args?: SelectSubset<T, MeetingFindFirstArgs<ExtArgs>>): Prisma__MeetingClient<$Result.GetResult<Prisma.$MeetingPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Meeting that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MeetingFindFirstOrThrowArgs} args - Arguments to find a Meeting
     * @example
     * // Get one Meeting
     * const meeting = await prisma.meeting.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MeetingFindFirstOrThrowArgs>(args?: SelectSubset<T, MeetingFindFirstOrThrowArgs<ExtArgs>>): Prisma__MeetingClient<$Result.GetResult<Prisma.$MeetingPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Meetings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MeetingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Meetings
     * const meetings = await prisma.meeting.findMany()
     * 
     * // Get first 10 Meetings
     * const meetings = await prisma.meeting.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const meetingWithIdOnly = await prisma.meeting.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MeetingFindManyArgs>(args?: SelectSubset<T, MeetingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MeetingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Meeting.
     * @param {MeetingCreateArgs} args - Arguments to create a Meeting.
     * @example
     * // Create one Meeting
     * const Meeting = await prisma.meeting.create({
     *   data: {
     *     // ... data to create a Meeting
     *   }
     * })
     * 
     */
    create<T extends MeetingCreateArgs>(args: SelectSubset<T, MeetingCreateArgs<ExtArgs>>): Prisma__MeetingClient<$Result.GetResult<Prisma.$MeetingPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Meetings.
     * @param {MeetingCreateManyArgs} args - Arguments to create many Meetings.
     * @example
     * // Create many Meetings
     * const meeting = await prisma.meeting.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MeetingCreateManyArgs>(args?: SelectSubset<T, MeetingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Meetings and returns the data saved in the database.
     * @param {MeetingCreateManyAndReturnArgs} args - Arguments to create many Meetings.
     * @example
     * // Create many Meetings
     * const meeting = await prisma.meeting.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Meetings and only return the `id`
     * const meetingWithIdOnly = await prisma.meeting.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MeetingCreateManyAndReturnArgs>(args?: SelectSubset<T, MeetingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MeetingPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Meeting.
     * @param {MeetingDeleteArgs} args - Arguments to delete one Meeting.
     * @example
     * // Delete one Meeting
     * const Meeting = await prisma.meeting.delete({
     *   where: {
     *     // ... filter to delete one Meeting
     *   }
     * })
     * 
     */
    delete<T extends MeetingDeleteArgs>(args: SelectSubset<T, MeetingDeleteArgs<ExtArgs>>): Prisma__MeetingClient<$Result.GetResult<Prisma.$MeetingPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Meeting.
     * @param {MeetingUpdateArgs} args - Arguments to update one Meeting.
     * @example
     * // Update one Meeting
     * const meeting = await prisma.meeting.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MeetingUpdateArgs>(args: SelectSubset<T, MeetingUpdateArgs<ExtArgs>>): Prisma__MeetingClient<$Result.GetResult<Prisma.$MeetingPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Meetings.
     * @param {MeetingDeleteManyArgs} args - Arguments to filter Meetings to delete.
     * @example
     * // Delete a few Meetings
     * const { count } = await prisma.meeting.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MeetingDeleteManyArgs>(args?: SelectSubset<T, MeetingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Meetings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MeetingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Meetings
     * const meeting = await prisma.meeting.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MeetingUpdateManyArgs>(args: SelectSubset<T, MeetingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Meetings and returns the data updated in the database.
     * @param {MeetingUpdateManyAndReturnArgs} args - Arguments to update many Meetings.
     * @example
     * // Update many Meetings
     * const meeting = await prisma.meeting.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Meetings and only return the `id`
     * const meetingWithIdOnly = await prisma.meeting.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MeetingUpdateManyAndReturnArgs>(args: SelectSubset<T, MeetingUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MeetingPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Meeting.
     * @param {MeetingUpsertArgs} args - Arguments to update or create a Meeting.
     * @example
     * // Update or create a Meeting
     * const meeting = await prisma.meeting.upsert({
     *   create: {
     *     // ... data to create a Meeting
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Meeting we want to update
     *   }
     * })
     */
    upsert<T extends MeetingUpsertArgs>(args: SelectSubset<T, MeetingUpsertArgs<ExtArgs>>): Prisma__MeetingClient<$Result.GetResult<Prisma.$MeetingPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Meetings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MeetingCountArgs} args - Arguments to filter Meetings to count.
     * @example
     * // Count the number of Meetings
     * const count = await prisma.meeting.count({
     *   where: {
     *     // ... the filter for the Meetings we want to count
     *   }
     * })
    **/
    count<T extends MeetingCountArgs>(
      args?: Subset<T, MeetingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MeetingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Meeting.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MeetingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MeetingAggregateArgs>(args: Subset<T, MeetingAggregateArgs>): Prisma.PrismaPromise<GetMeetingAggregateType<T>>

    /**
     * Group by Meeting.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MeetingGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MeetingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MeetingGroupByArgs['orderBy'] }
        : { orderBy?: MeetingGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MeetingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMeetingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Meeting model
   */
  readonly fields: MeetingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Meeting.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MeetingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    section<T extends SectionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SectionDefaultArgs<ExtArgs>>): Prisma__SectionClient<$Result.GetResult<Prisma.$SectionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Meeting model
   */
  interface MeetingFieldRefs {
    readonly id: FieldRef<"Meeting", 'Int'>
    readonly day: FieldRef<"Meeting", 'Day'>
    readonly startTime: FieldRef<"Meeting", 'DateTime'>
    readonly endTime: FieldRef<"Meeting", 'DateTime'>
    readonly location: FieldRef<"Meeting", 'String'>
    readonly sectionId: FieldRef<"Meeting", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Meeting findUnique
   */
  export type MeetingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Meeting
     */
    select?: MeetingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Meeting
     */
    omit?: MeetingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MeetingInclude<ExtArgs> | null
    /**
     * Filter, which Meeting to fetch.
     */
    where: MeetingWhereUniqueInput
  }

  /**
   * Meeting findUniqueOrThrow
   */
  export type MeetingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Meeting
     */
    select?: MeetingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Meeting
     */
    omit?: MeetingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MeetingInclude<ExtArgs> | null
    /**
     * Filter, which Meeting to fetch.
     */
    where: MeetingWhereUniqueInput
  }

  /**
   * Meeting findFirst
   */
  export type MeetingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Meeting
     */
    select?: MeetingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Meeting
     */
    omit?: MeetingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MeetingInclude<ExtArgs> | null
    /**
     * Filter, which Meeting to fetch.
     */
    where?: MeetingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Meetings to fetch.
     */
    orderBy?: MeetingOrderByWithRelationInput | MeetingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Meetings.
     */
    cursor?: MeetingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Meetings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Meetings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Meetings.
     */
    distinct?: MeetingScalarFieldEnum | MeetingScalarFieldEnum[]
  }

  /**
   * Meeting findFirstOrThrow
   */
  export type MeetingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Meeting
     */
    select?: MeetingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Meeting
     */
    omit?: MeetingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MeetingInclude<ExtArgs> | null
    /**
     * Filter, which Meeting to fetch.
     */
    where?: MeetingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Meetings to fetch.
     */
    orderBy?: MeetingOrderByWithRelationInput | MeetingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Meetings.
     */
    cursor?: MeetingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Meetings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Meetings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Meetings.
     */
    distinct?: MeetingScalarFieldEnum | MeetingScalarFieldEnum[]
  }

  /**
   * Meeting findMany
   */
  export type MeetingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Meeting
     */
    select?: MeetingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Meeting
     */
    omit?: MeetingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MeetingInclude<ExtArgs> | null
    /**
     * Filter, which Meetings to fetch.
     */
    where?: MeetingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Meetings to fetch.
     */
    orderBy?: MeetingOrderByWithRelationInput | MeetingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Meetings.
     */
    cursor?: MeetingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Meetings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Meetings.
     */
    skip?: number
    distinct?: MeetingScalarFieldEnum | MeetingScalarFieldEnum[]
  }

  /**
   * Meeting create
   */
  export type MeetingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Meeting
     */
    select?: MeetingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Meeting
     */
    omit?: MeetingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MeetingInclude<ExtArgs> | null
    /**
     * The data needed to create a Meeting.
     */
    data: XOR<MeetingCreateInput, MeetingUncheckedCreateInput>
  }

  /**
   * Meeting createMany
   */
  export type MeetingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Meetings.
     */
    data: MeetingCreateManyInput | MeetingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Meeting createManyAndReturn
   */
  export type MeetingCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Meeting
     */
    select?: MeetingSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Meeting
     */
    omit?: MeetingOmit<ExtArgs> | null
    /**
     * The data used to create many Meetings.
     */
    data: MeetingCreateManyInput | MeetingCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MeetingIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Meeting update
   */
  export type MeetingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Meeting
     */
    select?: MeetingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Meeting
     */
    omit?: MeetingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MeetingInclude<ExtArgs> | null
    /**
     * The data needed to update a Meeting.
     */
    data: XOR<MeetingUpdateInput, MeetingUncheckedUpdateInput>
    /**
     * Choose, which Meeting to update.
     */
    where: MeetingWhereUniqueInput
  }

  /**
   * Meeting updateMany
   */
  export type MeetingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Meetings.
     */
    data: XOR<MeetingUpdateManyMutationInput, MeetingUncheckedUpdateManyInput>
    /**
     * Filter which Meetings to update
     */
    where?: MeetingWhereInput
    /**
     * Limit how many Meetings to update.
     */
    limit?: number
  }

  /**
   * Meeting updateManyAndReturn
   */
  export type MeetingUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Meeting
     */
    select?: MeetingSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Meeting
     */
    omit?: MeetingOmit<ExtArgs> | null
    /**
     * The data used to update Meetings.
     */
    data: XOR<MeetingUpdateManyMutationInput, MeetingUncheckedUpdateManyInput>
    /**
     * Filter which Meetings to update
     */
    where?: MeetingWhereInput
    /**
     * Limit how many Meetings to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MeetingIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Meeting upsert
   */
  export type MeetingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Meeting
     */
    select?: MeetingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Meeting
     */
    omit?: MeetingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MeetingInclude<ExtArgs> | null
    /**
     * The filter to search for the Meeting to update in case it exists.
     */
    where: MeetingWhereUniqueInput
    /**
     * In case the Meeting found by the `where` argument doesn't exist, create a new Meeting with this data.
     */
    create: XOR<MeetingCreateInput, MeetingUncheckedCreateInput>
    /**
     * In case the Meeting was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MeetingUpdateInput, MeetingUncheckedUpdateInput>
  }

  /**
   * Meeting delete
   */
  export type MeetingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Meeting
     */
    select?: MeetingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Meeting
     */
    omit?: MeetingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MeetingInclude<ExtArgs> | null
    /**
     * Filter which Meeting to delete.
     */
    where: MeetingWhereUniqueInput
  }

  /**
   * Meeting deleteMany
   */
  export type MeetingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Meetings to delete
     */
    where?: MeetingWhereInput
    /**
     * Limit how many Meetings to delete.
     */
    limit?: number
  }

  /**
   * Meeting without action
   */
  export type MeetingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Meeting
     */
    select?: MeetingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Meeting
     */
    omit?: MeetingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MeetingInclude<ExtArgs> | null
  }


  /**
   * Model Instructor
   */

  export type AggregateInstructor = {
    _count: InstructorCountAggregateOutputType | null
    _avg: InstructorAvgAggregateOutputType | null
    _sum: InstructorSumAggregateOutputType | null
    _min: InstructorMinAggregateOutputType | null
    _max: InstructorMaxAggregateOutputType | null
  }

  export type InstructorAvgAggregateOutputType = {
    id: number | null
  }

  export type InstructorSumAggregateOutputType = {
    id: number | null
  }

  export type InstructorMinAggregateOutputType = {
    id: number | null
    firstName: string | null
    lastName: string | null
    title: string | null
    email: string | null
    phone: string | null
  }

  export type InstructorMaxAggregateOutputType = {
    id: number | null
    firstName: string | null
    lastName: string | null
    title: string | null
    email: string | null
    phone: string | null
  }

  export type InstructorCountAggregateOutputType = {
    id: number
    firstName: number
    lastName: number
    title: number
    email: number
    phone: number
    _all: number
  }


  export type InstructorAvgAggregateInputType = {
    id?: true
  }

  export type InstructorSumAggregateInputType = {
    id?: true
  }

  export type InstructorMinAggregateInputType = {
    id?: true
    firstName?: true
    lastName?: true
    title?: true
    email?: true
    phone?: true
  }

  export type InstructorMaxAggregateInputType = {
    id?: true
    firstName?: true
    lastName?: true
    title?: true
    email?: true
    phone?: true
  }

  export type InstructorCountAggregateInputType = {
    id?: true
    firstName?: true
    lastName?: true
    title?: true
    email?: true
    phone?: true
    _all?: true
  }

  export type InstructorAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Instructor to aggregate.
     */
    where?: InstructorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Instructors to fetch.
     */
    orderBy?: InstructorOrderByWithRelationInput | InstructorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: InstructorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Instructors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Instructors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Instructors
    **/
    _count?: true | InstructorCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: InstructorAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: InstructorSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: InstructorMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: InstructorMaxAggregateInputType
  }

  export type GetInstructorAggregateType<T extends InstructorAggregateArgs> = {
        [P in keyof T & keyof AggregateInstructor]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateInstructor[P]>
      : GetScalarType<T[P], AggregateInstructor[P]>
  }




  export type InstructorGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InstructorWhereInput
    orderBy?: InstructorOrderByWithAggregationInput | InstructorOrderByWithAggregationInput[]
    by: InstructorScalarFieldEnum[] | InstructorScalarFieldEnum
    having?: InstructorScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: InstructorCountAggregateInputType | true
    _avg?: InstructorAvgAggregateInputType
    _sum?: InstructorSumAggregateInputType
    _min?: InstructorMinAggregateInputType
    _max?: InstructorMaxAggregateInputType
  }

  export type InstructorGroupByOutputType = {
    id: number
    firstName: string
    lastName: string
    title: string | null
    email: string | null
    phone: string | null
    _count: InstructorCountAggregateOutputType | null
    _avg: InstructorAvgAggregateOutputType | null
    _sum: InstructorSumAggregateOutputType | null
    _min: InstructorMinAggregateOutputType | null
    _max: InstructorMaxAggregateOutputType | null
  }

  type GetInstructorGroupByPayload<T extends InstructorGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<InstructorGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof InstructorGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], InstructorGroupByOutputType[P]>
            : GetScalarType<T[P], InstructorGroupByOutputType[P]>
        }
      >
    >


  export type InstructorSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    firstName?: boolean
    lastName?: boolean
    title?: boolean
    email?: boolean
    phone?: boolean
    sections?: boolean | Instructor$sectionsArgs<ExtArgs>
    departments?: boolean | Instructor$departmentsArgs<ExtArgs>
    _count?: boolean | InstructorCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["instructor"]>

  export type InstructorSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    firstName?: boolean
    lastName?: boolean
    title?: boolean
    email?: boolean
    phone?: boolean
  }, ExtArgs["result"]["instructor"]>

  export type InstructorSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    firstName?: boolean
    lastName?: boolean
    title?: boolean
    email?: boolean
    phone?: boolean
  }, ExtArgs["result"]["instructor"]>

  export type InstructorSelectScalar = {
    id?: boolean
    firstName?: boolean
    lastName?: boolean
    title?: boolean
    email?: boolean
    phone?: boolean
  }

  export type InstructorOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "firstName" | "lastName" | "title" | "email" | "phone", ExtArgs["result"]["instructor"]>
  export type InstructorInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sections?: boolean | Instructor$sectionsArgs<ExtArgs>
    departments?: boolean | Instructor$departmentsArgs<ExtArgs>
    _count?: boolean | InstructorCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type InstructorIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type InstructorIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $InstructorPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Instructor"
    objects: {
      sections: Prisma.$SectionPayload<ExtArgs>[]
      departments: Prisma.$DepartmentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      firstName: string
      lastName: string
      title: string | null
      email: string | null
      phone: string | null
    }, ExtArgs["result"]["instructor"]>
    composites: {}
  }

  type InstructorGetPayload<S extends boolean | null | undefined | InstructorDefaultArgs> = $Result.GetResult<Prisma.$InstructorPayload, S>

  type InstructorCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<InstructorFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: InstructorCountAggregateInputType | true
    }

  export interface InstructorDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Instructor'], meta: { name: 'Instructor' } }
    /**
     * Find zero or one Instructor that matches the filter.
     * @param {InstructorFindUniqueArgs} args - Arguments to find a Instructor
     * @example
     * // Get one Instructor
     * const instructor = await prisma.instructor.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends InstructorFindUniqueArgs>(args: SelectSubset<T, InstructorFindUniqueArgs<ExtArgs>>): Prisma__InstructorClient<$Result.GetResult<Prisma.$InstructorPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Instructor that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {InstructorFindUniqueOrThrowArgs} args - Arguments to find a Instructor
     * @example
     * // Get one Instructor
     * const instructor = await prisma.instructor.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends InstructorFindUniqueOrThrowArgs>(args: SelectSubset<T, InstructorFindUniqueOrThrowArgs<ExtArgs>>): Prisma__InstructorClient<$Result.GetResult<Prisma.$InstructorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Instructor that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstructorFindFirstArgs} args - Arguments to find a Instructor
     * @example
     * // Get one Instructor
     * const instructor = await prisma.instructor.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends InstructorFindFirstArgs>(args?: SelectSubset<T, InstructorFindFirstArgs<ExtArgs>>): Prisma__InstructorClient<$Result.GetResult<Prisma.$InstructorPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Instructor that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstructorFindFirstOrThrowArgs} args - Arguments to find a Instructor
     * @example
     * // Get one Instructor
     * const instructor = await prisma.instructor.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends InstructorFindFirstOrThrowArgs>(args?: SelectSubset<T, InstructorFindFirstOrThrowArgs<ExtArgs>>): Prisma__InstructorClient<$Result.GetResult<Prisma.$InstructorPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Instructors that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstructorFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Instructors
     * const instructors = await prisma.instructor.findMany()
     * 
     * // Get first 10 Instructors
     * const instructors = await prisma.instructor.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const instructorWithIdOnly = await prisma.instructor.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends InstructorFindManyArgs>(args?: SelectSubset<T, InstructorFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InstructorPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Instructor.
     * @param {InstructorCreateArgs} args - Arguments to create a Instructor.
     * @example
     * // Create one Instructor
     * const Instructor = await prisma.instructor.create({
     *   data: {
     *     // ... data to create a Instructor
     *   }
     * })
     * 
     */
    create<T extends InstructorCreateArgs>(args: SelectSubset<T, InstructorCreateArgs<ExtArgs>>): Prisma__InstructorClient<$Result.GetResult<Prisma.$InstructorPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Instructors.
     * @param {InstructorCreateManyArgs} args - Arguments to create many Instructors.
     * @example
     * // Create many Instructors
     * const instructor = await prisma.instructor.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends InstructorCreateManyArgs>(args?: SelectSubset<T, InstructorCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Instructors and returns the data saved in the database.
     * @param {InstructorCreateManyAndReturnArgs} args - Arguments to create many Instructors.
     * @example
     * // Create many Instructors
     * const instructor = await prisma.instructor.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Instructors and only return the `id`
     * const instructorWithIdOnly = await prisma.instructor.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends InstructorCreateManyAndReturnArgs>(args?: SelectSubset<T, InstructorCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InstructorPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Instructor.
     * @param {InstructorDeleteArgs} args - Arguments to delete one Instructor.
     * @example
     * // Delete one Instructor
     * const Instructor = await prisma.instructor.delete({
     *   where: {
     *     // ... filter to delete one Instructor
     *   }
     * })
     * 
     */
    delete<T extends InstructorDeleteArgs>(args: SelectSubset<T, InstructorDeleteArgs<ExtArgs>>): Prisma__InstructorClient<$Result.GetResult<Prisma.$InstructorPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Instructor.
     * @param {InstructorUpdateArgs} args - Arguments to update one Instructor.
     * @example
     * // Update one Instructor
     * const instructor = await prisma.instructor.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends InstructorUpdateArgs>(args: SelectSubset<T, InstructorUpdateArgs<ExtArgs>>): Prisma__InstructorClient<$Result.GetResult<Prisma.$InstructorPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Instructors.
     * @param {InstructorDeleteManyArgs} args - Arguments to filter Instructors to delete.
     * @example
     * // Delete a few Instructors
     * const { count } = await prisma.instructor.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends InstructorDeleteManyArgs>(args?: SelectSubset<T, InstructorDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Instructors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstructorUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Instructors
     * const instructor = await prisma.instructor.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends InstructorUpdateManyArgs>(args: SelectSubset<T, InstructorUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Instructors and returns the data updated in the database.
     * @param {InstructorUpdateManyAndReturnArgs} args - Arguments to update many Instructors.
     * @example
     * // Update many Instructors
     * const instructor = await prisma.instructor.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Instructors and only return the `id`
     * const instructorWithIdOnly = await prisma.instructor.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends InstructorUpdateManyAndReturnArgs>(args: SelectSubset<T, InstructorUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InstructorPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Instructor.
     * @param {InstructorUpsertArgs} args - Arguments to update or create a Instructor.
     * @example
     * // Update or create a Instructor
     * const instructor = await prisma.instructor.upsert({
     *   create: {
     *     // ... data to create a Instructor
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Instructor we want to update
     *   }
     * })
     */
    upsert<T extends InstructorUpsertArgs>(args: SelectSubset<T, InstructorUpsertArgs<ExtArgs>>): Prisma__InstructorClient<$Result.GetResult<Prisma.$InstructorPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Instructors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstructorCountArgs} args - Arguments to filter Instructors to count.
     * @example
     * // Count the number of Instructors
     * const count = await prisma.instructor.count({
     *   where: {
     *     // ... the filter for the Instructors we want to count
     *   }
     * })
    **/
    count<T extends InstructorCountArgs>(
      args?: Subset<T, InstructorCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], InstructorCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Instructor.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstructorAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends InstructorAggregateArgs>(args: Subset<T, InstructorAggregateArgs>): Prisma.PrismaPromise<GetInstructorAggregateType<T>>

    /**
     * Group by Instructor.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstructorGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends InstructorGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: InstructorGroupByArgs['orderBy'] }
        : { orderBy?: InstructorGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, InstructorGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInstructorGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Instructor model
   */
  readonly fields: InstructorFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Instructor.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__InstructorClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    sections<T extends Instructor$sectionsArgs<ExtArgs> = {}>(args?: Subset<T, Instructor$sectionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SectionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    departments<T extends Instructor$departmentsArgs<ExtArgs> = {}>(args?: Subset<T, Instructor$departmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Instructor model
   */
  interface InstructorFieldRefs {
    readonly id: FieldRef<"Instructor", 'Int'>
    readonly firstName: FieldRef<"Instructor", 'String'>
    readonly lastName: FieldRef<"Instructor", 'String'>
    readonly title: FieldRef<"Instructor", 'String'>
    readonly email: FieldRef<"Instructor", 'String'>
    readonly phone: FieldRef<"Instructor", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Instructor findUnique
   */
  export type InstructorFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Instructor
     */
    select?: InstructorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Instructor
     */
    omit?: InstructorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstructorInclude<ExtArgs> | null
    /**
     * Filter, which Instructor to fetch.
     */
    where: InstructorWhereUniqueInput
  }

  /**
   * Instructor findUniqueOrThrow
   */
  export type InstructorFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Instructor
     */
    select?: InstructorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Instructor
     */
    omit?: InstructorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstructorInclude<ExtArgs> | null
    /**
     * Filter, which Instructor to fetch.
     */
    where: InstructorWhereUniqueInput
  }

  /**
   * Instructor findFirst
   */
  export type InstructorFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Instructor
     */
    select?: InstructorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Instructor
     */
    omit?: InstructorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstructorInclude<ExtArgs> | null
    /**
     * Filter, which Instructor to fetch.
     */
    where?: InstructorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Instructors to fetch.
     */
    orderBy?: InstructorOrderByWithRelationInput | InstructorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Instructors.
     */
    cursor?: InstructorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Instructors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Instructors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Instructors.
     */
    distinct?: InstructorScalarFieldEnum | InstructorScalarFieldEnum[]
  }

  /**
   * Instructor findFirstOrThrow
   */
  export type InstructorFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Instructor
     */
    select?: InstructorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Instructor
     */
    omit?: InstructorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstructorInclude<ExtArgs> | null
    /**
     * Filter, which Instructor to fetch.
     */
    where?: InstructorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Instructors to fetch.
     */
    orderBy?: InstructorOrderByWithRelationInput | InstructorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Instructors.
     */
    cursor?: InstructorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Instructors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Instructors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Instructors.
     */
    distinct?: InstructorScalarFieldEnum | InstructorScalarFieldEnum[]
  }

  /**
   * Instructor findMany
   */
  export type InstructorFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Instructor
     */
    select?: InstructorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Instructor
     */
    omit?: InstructorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstructorInclude<ExtArgs> | null
    /**
     * Filter, which Instructors to fetch.
     */
    where?: InstructorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Instructors to fetch.
     */
    orderBy?: InstructorOrderByWithRelationInput | InstructorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Instructors.
     */
    cursor?: InstructorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Instructors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Instructors.
     */
    skip?: number
    distinct?: InstructorScalarFieldEnum | InstructorScalarFieldEnum[]
  }

  /**
   * Instructor create
   */
  export type InstructorCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Instructor
     */
    select?: InstructorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Instructor
     */
    omit?: InstructorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstructorInclude<ExtArgs> | null
    /**
     * The data needed to create a Instructor.
     */
    data: XOR<InstructorCreateInput, InstructorUncheckedCreateInput>
  }

  /**
   * Instructor createMany
   */
  export type InstructorCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Instructors.
     */
    data: InstructorCreateManyInput | InstructorCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Instructor createManyAndReturn
   */
  export type InstructorCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Instructor
     */
    select?: InstructorSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Instructor
     */
    omit?: InstructorOmit<ExtArgs> | null
    /**
     * The data used to create many Instructors.
     */
    data: InstructorCreateManyInput | InstructorCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Instructor update
   */
  export type InstructorUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Instructor
     */
    select?: InstructorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Instructor
     */
    omit?: InstructorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstructorInclude<ExtArgs> | null
    /**
     * The data needed to update a Instructor.
     */
    data: XOR<InstructorUpdateInput, InstructorUncheckedUpdateInput>
    /**
     * Choose, which Instructor to update.
     */
    where: InstructorWhereUniqueInput
  }

  /**
   * Instructor updateMany
   */
  export type InstructorUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Instructors.
     */
    data: XOR<InstructorUpdateManyMutationInput, InstructorUncheckedUpdateManyInput>
    /**
     * Filter which Instructors to update
     */
    where?: InstructorWhereInput
    /**
     * Limit how many Instructors to update.
     */
    limit?: number
  }

  /**
   * Instructor updateManyAndReturn
   */
  export type InstructorUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Instructor
     */
    select?: InstructorSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Instructor
     */
    omit?: InstructorOmit<ExtArgs> | null
    /**
     * The data used to update Instructors.
     */
    data: XOR<InstructorUpdateManyMutationInput, InstructorUncheckedUpdateManyInput>
    /**
     * Filter which Instructors to update
     */
    where?: InstructorWhereInput
    /**
     * Limit how many Instructors to update.
     */
    limit?: number
  }

  /**
   * Instructor upsert
   */
  export type InstructorUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Instructor
     */
    select?: InstructorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Instructor
     */
    omit?: InstructorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstructorInclude<ExtArgs> | null
    /**
     * The filter to search for the Instructor to update in case it exists.
     */
    where: InstructorWhereUniqueInput
    /**
     * In case the Instructor found by the `where` argument doesn't exist, create a new Instructor with this data.
     */
    create: XOR<InstructorCreateInput, InstructorUncheckedCreateInput>
    /**
     * In case the Instructor was found with the provided `where` argument, update it with this data.
     */
    update: XOR<InstructorUpdateInput, InstructorUncheckedUpdateInput>
  }

  /**
   * Instructor delete
   */
  export type InstructorDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Instructor
     */
    select?: InstructorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Instructor
     */
    omit?: InstructorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstructorInclude<ExtArgs> | null
    /**
     * Filter which Instructor to delete.
     */
    where: InstructorWhereUniqueInput
  }

  /**
   * Instructor deleteMany
   */
  export type InstructorDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Instructors to delete
     */
    where?: InstructorWhereInput
    /**
     * Limit how many Instructors to delete.
     */
    limit?: number
  }

  /**
   * Instructor.sections
   */
  export type Instructor$sectionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Section
     */
    select?: SectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Section
     */
    omit?: SectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SectionInclude<ExtArgs> | null
    where?: SectionWhereInput
    orderBy?: SectionOrderByWithRelationInput | SectionOrderByWithRelationInput[]
    cursor?: SectionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SectionScalarFieldEnum | SectionScalarFieldEnum[]
  }

  /**
   * Instructor.departments
   */
  export type Instructor$departmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Department
     */
    omit?: DepartmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DepartmentInclude<ExtArgs> | null
    where?: DepartmentWhereInput
    orderBy?: DepartmentOrderByWithRelationInput | DepartmentOrderByWithRelationInput[]
    cursor?: DepartmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DepartmentScalarFieldEnum | DepartmentScalarFieldEnum[]
  }

  /**
   * Instructor without action
   */
  export type InstructorDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Instructor
     */
    select?: InstructorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Instructor
     */
    omit?: InstructorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstructorInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const DepartmentScalarFieldEnum: {
    id: 'id',
    code: 'code',
    title: 'title'
  };

  export type DepartmentScalarFieldEnum = (typeof DepartmentScalarFieldEnum)[keyof typeof DepartmentScalarFieldEnum]


  export const CourseScalarFieldEnum: {
    id: 'id',
    code: 'code',
    title: 'title',
    description: 'description',
    departmentId: 'departmentId'
  };

  export type CourseScalarFieldEnum = (typeof CourseScalarFieldEnum)[keyof typeof CourseScalarFieldEnum]


  export const DiscussionGroupScalarFieldEnum: {
    id: 'id',
    courseId: 'courseId',
    term: 'term'
  };

  export type DiscussionGroupScalarFieldEnum = (typeof DiscussionGroupScalarFieldEnum)[keyof typeof DiscussionGroupScalarFieldEnum]


  export const SectionScalarFieldEnum: {
    id: 'id',
    sectionNumber: 'sectionNumber',
    classNumber: 'classNumber',
    term: 'term',
    isAsync: 'isAsync',
    courseId: 'courseId',
    discussionGroupId: 'discussionGroupId',
    type: 'type'
  };

  export type SectionScalarFieldEnum = (typeof SectionScalarFieldEnum)[keyof typeof SectionScalarFieldEnum]


  export const MeetingScalarFieldEnum: {
    id: 'id',
    day: 'day',
    startTime: 'startTime',
    endTime: 'endTime',
    location: 'location',
    sectionId: 'sectionId'
  };

  export type MeetingScalarFieldEnum = (typeof MeetingScalarFieldEnum)[keyof typeof MeetingScalarFieldEnum]


  export const InstructorScalarFieldEnum: {
    id: 'id',
    firstName: 'firstName',
    lastName: 'lastName',
    title: 'title',
    email: 'email',
    phone: 'phone'
  };

  export type InstructorScalarFieldEnum = (typeof InstructorScalarFieldEnum)[keyof typeof InstructorScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Day'
   */
  export type EnumDayFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Day'>
    


  /**
   * Reference to a field of type 'Day[]'
   */
  export type ListEnumDayFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Day[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type DepartmentWhereInput = {
    AND?: DepartmentWhereInput | DepartmentWhereInput[]
    OR?: DepartmentWhereInput[]
    NOT?: DepartmentWhereInput | DepartmentWhereInput[]
    id?: IntFilter<"Department"> | number
    code?: StringFilter<"Department"> | string
    title?: StringFilter<"Department"> | string
    courses?: CourseListRelationFilter
    instructors?: InstructorListRelationFilter
  }

  export type DepartmentOrderByWithRelationInput = {
    id?: SortOrder
    code?: SortOrder
    title?: SortOrder
    courses?: CourseOrderByRelationAggregateInput
    instructors?: InstructorOrderByRelationAggregateInput
  }

  export type DepartmentWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    code?: string
    AND?: DepartmentWhereInput | DepartmentWhereInput[]
    OR?: DepartmentWhereInput[]
    NOT?: DepartmentWhereInput | DepartmentWhereInput[]
    title?: StringFilter<"Department"> | string
    courses?: CourseListRelationFilter
    instructors?: InstructorListRelationFilter
  }, "id" | "code">

  export type DepartmentOrderByWithAggregationInput = {
    id?: SortOrder
    code?: SortOrder
    title?: SortOrder
    _count?: DepartmentCountOrderByAggregateInput
    _avg?: DepartmentAvgOrderByAggregateInput
    _max?: DepartmentMaxOrderByAggregateInput
    _min?: DepartmentMinOrderByAggregateInput
    _sum?: DepartmentSumOrderByAggregateInput
  }

  export type DepartmentScalarWhereWithAggregatesInput = {
    AND?: DepartmentScalarWhereWithAggregatesInput | DepartmentScalarWhereWithAggregatesInput[]
    OR?: DepartmentScalarWhereWithAggregatesInput[]
    NOT?: DepartmentScalarWhereWithAggregatesInput | DepartmentScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Department"> | number
    code?: StringWithAggregatesFilter<"Department"> | string
    title?: StringWithAggregatesFilter<"Department"> | string
  }

  export type CourseWhereInput = {
    AND?: CourseWhereInput | CourseWhereInput[]
    OR?: CourseWhereInput[]
    NOT?: CourseWhereInput | CourseWhereInput[]
    id?: IntFilter<"Course"> | number
    code?: StringFilter<"Course"> | string
    title?: StringFilter<"Course"> | string
    description?: StringFilter<"Course"> | string
    departmentId?: IntFilter<"Course"> | number
    sections?: SectionListRelationFilter
    discussionGroups?: DiscussionGroupListRelationFilter
    department?: XOR<DepartmentScalarRelationFilter, DepartmentWhereInput>
  }

  export type CourseOrderByWithRelationInput = {
    id?: SortOrder
    code?: SortOrder
    title?: SortOrder
    description?: SortOrder
    departmentId?: SortOrder
    sections?: SectionOrderByRelationAggregateInput
    discussionGroups?: DiscussionGroupOrderByRelationAggregateInput
    department?: DepartmentOrderByWithRelationInput
  }

  export type CourseWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    departmentId_code?: CourseDepartmentIdCodeCompoundUniqueInput
    AND?: CourseWhereInput | CourseWhereInput[]
    OR?: CourseWhereInput[]
    NOT?: CourseWhereInput | CourseWhereInput[]
    code?: StringFilter<"Course"> | string
    title?: StringFilter<"Course"> | string
    description?: StringFilter<"Course"> | string
    departmentId?: IntFilter<"Course"> | number
    sections?: SectionListRelationFilter
    discussionGroups?: DiscussionGroupListRelationFilter
    department?: XOR<DepartmentScalarRelationFilter, DepartmentWhereInput>
  }, "id" | "departmentId_code">

  export type CourseOrderByWithAggregationInput = {
    id?: SortOrder
    code?: SortOrder
    title?: SortOrder
    description?: SortOrder
    departmentId?: SortOrder
    _count?: CourseCountOrderByAggregateInput
    _avg?: CourseAvgOrderByAggregateInput
    _max?: CourseMaxOrderByAggregateInput
    _min?: CourseMinOrderByAggregateInput
    _sum?: CourseSumOrderByAggregateInput
  }

  export type CourseScalarWhereWithAggregatesInput = {
    AND?: CourseScalarWhereWithAggregatesInput | CourseScalarWhereWithAggregatesInput[]
    OR?: CourseScalarWhereWithAggregatesInput[]
    NOT?: CourseScalarWhereWithAggregatesInput | CourseScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Course"> | number
    code?: StringWithAggregatesFilter<"Course"> | string
    title?: StringWithAggregatesFilter<"Course"> | string
    description?: StringWithAggregatesFilter<"Course"> | string
    departmentId?: IntWithAggregatesFilter<"Course"> | number
  }

  export type DiscussionGroupWhereInput = {
    AND?: DiscussionGroupWhereInput | DiscussionGroupWhereInput[]
    OR?: DiscussionGroupWhereInput[]
    NOT?: DiscussionGroupWhereInput | DiscussionGroupWhereInput[]
    id?: IntFilter<"DiscussionGroup"> | number
    courseId?: IntFilter<"DiscussionGroup"> | number
    term?: StringFilter<"DiscussionGroup"> | string
    sections?: SectionListRelationFilter
    course?: XOR<CourseScalarRelationFilter, CourseWhereInput>
  }

  export type DiscussionGroupOrderByWithRelationInput = {
    id?: SortOrder
    courseId?: SortOrder
    term?: SortOrder
    sections?: SectionOrderByRelationAggregateInput
    course?: CourseOrderByWithRelationInput
  }

  export type DiscussionGroupWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    courseId_term?: DiscussionGroupCourseIdTermCompoundUniqueInput
    AND?: DiscussionGroupWhereInput | DiscussionGroupWhereInput[]
    OR?: DiscussionGroupWhereInput[]
    NOT?: DiscussionGroupWhereInput | DiscussionGroupWhereInput[]
    courseId?: IntFilter<"DiscussionGroup"> | number
    term?: StringFilter<"DiscussionGroup"> | string
    sections?: SectionListRelationFilter
    course?: XOR<CourseScalarRelationFilter, CourseWhereInput>
  }, "id" | "courseId_term">

  export type DiscussionGroupOrderByWithAggregationInput = {
    id?: SortOrder
    courseId?: SortOrder
    term?: SortOrder
    _count?: DiscussionGroupCountOrderByAggregateInput
    _avg?: DiscussionGroupAvgOrderByAggregateInput
    _max?: DiscussionGroupMaxOrderByAggregateInput
    _min?: DiscussionGroupMinOrderByAggregateInput
    _sum?: DiscussionGroupSumOrderByAggregateInput
  }

  export type DiscussionGroupScalarWhereWithAggregatesInput = {
    AND?: DiscussionGroupScalarWhereWithAggregatesInput | DiscussionGroupScalarWhereWithAggregatesInput[]
    OR?: DiscussionGroupScalarWhereWithAggregatesInput[]
    NOT?: DiscussionGroupScalarWhereWithAggregatesInput | DiscussionGroupScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"DiscussionGroup"> | number
    courseId?: IntWithAggregatesFilter<"DiscussionGroup"> | number
    term?: StringWithAggregatesFilter<"DiscussionGroup"> | string
  }

  export type SectionWhereInput = {
    AND?: SectionWhereInput | SectionWhereInput[]
    OR?: SectionWhereInput[]
    NOT?: SectionWhereInput | SectionWhereInput[]
    id?: IntFilter<"Section"> | number
    sectionNumber?: StringFilter<"Section"> | string
    classNumber?: StringFilter<"Section"> | string
    term?: StringFilter<"Section"> | string
    isAsync?: BoolFilter<"Section"> | boolean
    courseId?: IntFilter<"Section"> | number
    discussionGroupId?: IntNullableFilter<"Section"> | number | null
    type?: StringFilter<"Section"> | string
    meetings?: MeetingListRelationFilter
    instructors?: InstructorListRelationFilter
    course?: XOR<CourseScalarRelationFilter, CourseWhereInput>
    discussionGroup?: XOR<DiscussionGroupNullableScalarRelationFilter, DiscussionGroupWhereInput> | null
  }

  export type SectionOrderByWithRelationInput = {
    id?: SortOrder
    sectionNumber?: SortOrder
    classNumber?: SortOrder
    term?: SortOrder
    isAsync?: SortOrder
    courseId?: SortOrder
    discussionGroupId?: SortOrderInput | SortOrder
    type?: SortOrder
    meetings?: MeetingOrderByRelationAggregateInput
    instructors?: InstructorOrderByRelationAggregateInput
    course?: CourseOrderByWithRelationInput
    discussionGroup?: DiscussionGroupOrderByWithRelationInput
  }

  export type SectionWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    classNumber_term?: SectionClassNumberTermCompoundUniqueInput
    AND?: SectionWhereInput | SectionWhereInput[]
    OR?: SectionWhereInput[]
    NOT?: SectionWhereInput | SectionWhereInput[]
    sectionNumber?: StringFilter<"Section"> | string
    classNumber?: StringFilter<"Section"> | string
    term?: StringFilter<"Section"> | string
    isAsync?: BoolFilter<"Section"> | boolean
    courseId?: IntFilter<"Section"> | number
    discussionGroupId?: IntNullableFilter<"Section"> | number | null
    type?: StringFilter<"Section"> | string
    meetings?: MeetingListRelationFilter
    instructors?: InstructorListRelationFilter
    course?: XOR<CourseScalarRelationFilter, CourseWhereInput>
    discussionGroup?: XOR<DiscussionGroupNullableScalarRelationFilter, DiscussionGroupWhereInput> | null
  }, "id" | "classNumber_term">

  export type SectionOrderByWithAggregationInput = {
    id?: SortOrder
    sectionNumber?: SortOrder
    classNumber?: SortOrder
    term?: SortOrder
    isAsync?: SortOrder
    courseId?: SortOrder
    discussionGroupId?: SortOrderInput | SortOrder
    type?: SortOrder
    _count?: SectionCountOrderByAggregateInput
    _avg?: SectionAvgOrderByAggregateInput
    _max?: SectionMaxOrderByAggregateInput
    _min?: SectionMinOrderByAggregateInput
    _sum?: SectionSumOrderByAggregateInput
  }

  export type SectionScalarWhereWithAggregatesInput = {
    AND?: SectionScalarWhereWithAggregatesInput | SectionScalarWhereWithAggregatesInput[]
    OR?: SectionScalarWhereWithAggregatesInput[]
    NOT?: SectionScalarWhereWithAggregatesInput | SectionScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Section"> | number
    sectionNumber?: StringWithAggregatesFilter<"Section"> | string
    classNumber?: StringWithAggregatesFilter<"Section"> | string
    term?: StringWithAggregatesFilter<"Section"> | string
    isAsync?: BoolWithAggregatesFilter<"Section"> | boolean
    courseId?: IntWithAggregatesFilter<"Section"> | number
    discussionGroupId?: IntNullableWithAggregatesFilter<"Section"> | number | null
    type?: StringWithAggregatesFilter<"Section"> | string
  }

  export type MeetingWhereInput = {
    AND?: MeetingWhereInput | MeetingWhereInput[]
    OR?: MeetingWhereInput[]
    NOT?: MeetingWhereInput | MeetingWhereInput[]
    id?: IntFilter<"Meeting"> | number
    day?: EnumDayFilter<"Meeting"> | $Enums.Day
    startTime?: DateTimeFilter<"Meeting"> | Date | string
    endTime?: DateTimeFilter<"Meeting"> | Date | string
    location?: StringNullableFilter<"Meeting"> | string | null
    sectionId?: IntFilter<"Meeting"> | number
    section?: XOR<SectionScalarRelationFilter, SectionWhereInput>
  }

  export type MeetingOrderByWithRelationInput = {
    id?: SortOrder
    day?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    location?: SortOrderInput | SortOrder
    sectionId?: SortOrder
    section?: SectionOrderByWithRelationInput
  }

  export type MeetingWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    sectionId_day_startTime_endTime?: MeetingSectionIdDayStartTimeEndTimeCompoundUniqueInput
    AND?: MeetingWhereInput | MeetingWhereInput[]
    OR?: MeetingWhereInput[]
    NOT?: MeetingWhereInput | MeetingWhereInput[]
    day?: EnumDayFilter<"Meeting"> | $Enums.Day
    startTime?: DateTimeFilter<"Meeting"> | Date | string
    endTime?: DateTimeFilter<"Meeting"> | Date | string
    location?: StringNullableFilter<"Meeting"> | string | null
    sectionId?: IntFilter<"Meeting"> | number
    section?: XOR<SectionScalarRelationFilter, SectionWhereInput>
  }, "id" | "sectionId_day_startTime_endTime">

  export type MeetingOrderByWithAggregationInput = {
    id?: SortOrder
    day?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    location?: SortOrderInput | SortOrder
    sectionId?: SortOrder
    _count?: MeetingCountOrderByAggregateInput
    _avg?: MeetingAvgOrderByAggregateInput
    _max?: MeetingMaxOrderByAggregateInput
    _min?: MeetingMinOrderByAggregateInput
    _sum?: MeetingSumOrderByAggregateInput
  }

  export type MeetingScalarWhereWithAggregatesInput = {
    AND?: MeetingScalarWhereWithAggregatesInput | MeetingScalarWhereWithAggregatesInput[]
    OR?: MeetingScalarWhereWithAggregatesInput[]
    NOT?: MeetingScalarWhereWithAggregatesInput | MeetingScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Meeting"> | number
    day?: EnumDayWithAggregatesFilter<"Meeting"> | $Enums.Day
    startTime?: DateTimeWithAggregatesFilter<"Meeting"> | Date | string
    endTime?: DateTimeWithAggregatesFilter<"Meeting"> | Date | string
    location?: StringNullableWithAggregatesFilter<"Meeting"> | string | null
    sectionId?: IntWithAggregatesFilter<"Meeting"> | number
  }

  export type InstructorWhereInput = {
    AND?: InstructorWhereInput | InstructorWhereInput[]
    OR?: InstructorWhereInput[]
    NOT?: InstructorWhereInput | InstructorWhereInput[]
    id?: IntFilter<"Instructor"> | number
    firstName?: StringFilter<"Instructor"> | string
    lastName?: StringFilter<"Instructor"> | string
    title?: StringNullableFilter<"Instructor"> | string | null
    email?: StringNullableFilter<"Instructor"> | string | null
    phone?: StringNullableFilter<"Instructor"> | string | null
    sections?: SectionListRelationFilter
    departments?: DepartmentListRelationFilter
  }

  export type InstructorOrderByWithRelationInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    title?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    sections?: SectionOrderByRelationAggregateInput
    departments?: DepartmentOrderByRelationAggregateInput
  }

  export type InstructorWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email?: string
    AND?: InstructorWhereInput | InstructorWhereInput[]
    OR?: InstructorWhereInput[]
    NOT?: InstructorWhereInput | InstructorWhereInput[]
    firstName?: StringFilter<"Instructor"> | string
    lastName?: StringFilter<"Instructor"> | string
    title?: StringNullableFilter<"Instructor"> | string | null
    phone?: StringNullableFilter<"Instructor"> | string | null
    sections?: SectionListRelationFilter
    departments?: DepartmentListRelationFilter
  }, "id" | "email">

  export type InstructorOrderByWithAggregationInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    title?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    _count?: InstructorCountOrderByAggregateInput
    _avg?: InstructorAvgOrderByAggregateInput
    _max?: InstructorMaxOrderByAggregateInput
    _min?: InstructorMinOrderByAggregateInput
    _sum?: InstructorSumOrderByAggregateInput
  }

  export type InstructorScalarWhereWithAggregatesInput = {
    AND?: InstructorScalarWhereWithAggregatesInput | InstructorScalarWhereWithAggregatesInput[]
    OR?: InstructorScalarWhereWithAggregatesInput[]
    NOT?: InstructorScalarWhereWithAggregatesInput | InstructorScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Instructor"> | number
    firstName?: StringWithAggregatesFilter<"Instructor"> | string
    lastName?: StringWithAggregatesFilter<"Instructor"> | string
    title?: StringNullableWithAggregatesFilter<"Instructor"> | string | null
    email?: StringNullableWithAggregatesFilter<"Instructor"> | string | null
    phone?: StringNullableWithAggregatesFilter<"Instructor"> | string | null
  }

  export type DepartmentCreateInput = {
    code: string
    title: string
    courses?: CourseCreateNestedManyWithoutDepartmentInput
    instructors?: InstructorCreateNestedManyWithoutDepartmentsInput
  }

  export type DepartmentUncheckedCreateInput = {
    id?: number
    code: string
    title: string
    courses?: CourseUncheckedCreateNestedManyWithoutDepartmentInput
    instructors?: InstructorUncheckedCreateNestedManyWithoutDepartmentsInput
  }

  export type DepartmentUpdateInput = {
    code?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    courses?: CourseUpdateManyWithoutDepartmentNestedInput
    instructors?: InstructorUpdateManyWithoutDepartmentsNestedInput
  }

  export type DepartmentUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    courses?: CourseUncheckedUpdateManyWithoutDepartmentNestedInput
    instructors?: InstructorUncheckedUpdateManyWithoutDepartmentsNestedInput
  }

  export type DepartmentCreateManyInput = {
    id?: number
    code: string
    title: string
  }

  export type DepartmentUpdateManyMutationInput = {
    code?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
  }

  export type DepartmentUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
  }

  export type CourseCreateInput = {
    code: string
    title: string
    description: string
    sections?: SectionCreateNestedManyWithoutCourseInput
    discussionGroups?: DiscussionGroupCreateNestedManyWithoutCourseInput
    department: DepartmentCreateNestedOneWithoutCoursesInput
  }

  export type CourseUncheckedCreateInput = {
    id?: number
    code: string
    title: string
    description: string
    departmentId: number
    sections?: SectionUncheckedCreateNestedManyWithoutCourseInput
    discussionGroups?: DiscussionGroupUncheckedCreateNestedManyWithoutCourseInput
  }

  export type CourseUpdateInput = {
    code?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    sections?: SectionUpdateManyWithoutCourseNestedInput
    discussionGroups?: DiscussionGroupUpdateManyWithoutCourseNestedInput
    department?: DepartmentUpdateOneRequiredWithoutCoursesNestedInput
  }

  export type CourseUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    departmentId?: IntFieldUpdateOperationsInput | number
    sections?: SectionUncheckedUpdateManyWithoutCourseNestedInput
    discussionGroups?: DiscussionGroupUncheckedUpdateManyWithoutCourseNestedInput
  }

  export type CourseCreateManyInput = {
    id?: number
    code: string
    title: string
    description: string
    departmentId: number
  }

  export type CourseUpdateManyMutationInput = {
    code?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
  }

  export type CourseUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    departmentId?: IntFieldUpdateOperationsInput | number
  }

  export type DiscussionGroupCreateInput = {
    term: string
    sections?: SectionCreateNestedManyWithoutDiscussionGroupInput
    course: CourseCreateNestedOneWithoutDiscussionGroupsInput
  }

  export type DiscussionGroupUncheckedCreateInput = {
    id?: number
    courseId: number
    term: string
    sections?: SectionUncheckedCreateNestedManyWithoutDiscussionGroupInput
  }

  export type DiscussionGroupUpdateInput = {
    term?: StringFieldUpdateOperationsInput | string
    sections?: SectionUpdateManyWithoutDiscussionGroupNestedInput
    course?: CourseUpdateOneRequiredWithoutDiscussionGroupsNestedInput
  }

  export type DiscussionGroupUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    courseId?: IntFieldUpdateOperationsInput | number
    term?: StringFieldUpdateOperationsInput | string
    sections?: SectionUncheckedUpdateManyWithoutDiscussionGroupNestedInput
  }

  export type DiscussionGroupCreateManyInput = {
    id?: number
    courseId: number
    term: string
  }

  export type DiscussionGroupUpdateManyMutationInput = {
    term?: StringFieldUpdateOperationsInput | string
  }

  export type DiscussionGroupUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    courseId?: IntFieldUpdateOperationsInput | number
    term?: StringFieldUpdateOperationsInput | string
  }

  export type SectionCreateInput = {
    sectionNumber: string
    classNumber: string
    term: string
    isAsync?: boolean
    type?: string
    meetings?: MeetingCreateNestedManyWithoutSectionInput
    instructors?: InstructorCreateNestedManyWithoutSectionsInput
    course: CourseCreateNestedOneWithoutSectionsInput
    discussionGroup?: DiscussionGroupCreateNestedOneWithoutSectionsInput
  }

  export type SectionUncheckedCreateInput = {
    id?: number
    sectionNumber: string
    classNumber: string
    term: string
    isAsync?: boolean
    courseId: number
    discussionGroupId?: number | null
    type?: string
    meetings?: MeetingUncheckedCreateNestedManyWithoutSectionInput
    instructors?: InstructorUncheckedCreateNestedManyWithoutSectionsInput
  }

  export type SectionUpdateInput = {
    sectionNumber?: StringFieldUpdateOperationsInput | string
    classNumber?: StringFieldUpdateOperationsInput | string
    term?: StringFieldUpdateOperationsInput | string
    isAsync?: BoolFieldUpdateOperationsInput | boolean
    type?: StringFieldUpdateOperationsInput | string
    meetings?: MeetingUpdateManyWithoutSectionNestedInput
    instructors?: InstructorUpdateManyWithoutSectionsNestedInput
    course?: CourseUpdateOneRequiredWithoutSectionsNestedInput
    discussionGroup?: DiscussionGroupUpdateOneWithoutSectionsNestedInput
  }

  export type SectionUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    sectionNumber?: StringFieldUpdateOperationsInput | string
    classNumber?: StringFieldUpdateOperationsInput | string
    term?: StringFieldUpdateOperationsInput | string
    isAsync?: BoolFieldUpdateOperationsInput | boolean
    courseId?: IntFieldUpdateOperationsInput | number
    discussionGroupId?: NullableIntFieldUpdateOperationsInput | number | null
    type?: StringFieldUpdateOperationsInput | string
    meetings?: MeetingUncheckedUpdateManyWithoutSectionNestedInput
    instructors?: InstructorUncheckedUpdateManyWithoutSectionsNestedInput
  }

  export type SectionCreateManyInput = {
    id?: number
    sectionNumber: string
    classNumber: string
    term: string
    isAsync?: boolean
    courseId: number
    discussionGroupId?: number | null
    type?: string
  }

  export type SectionUpdateManyMutationInput = {
    sectionNumber?: StringFieldUpdateOperationsInput | string
    classNumber?: StringFieldUpdateOperationsInput | string
    term?: StringFieldUpdateOperationsInput | string
    isAsync?: BoolFieldUpdateOperationsInput | boolean
    type?: StringFieldUpdateOperationsInput | string
  }

  export type SectionUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    sectionNumber?: StringFieldUpdateOperationsInput | string
    classNumber?: StringFieldUpdateOperationsInput | string
    term?: StringFieldUpdateOperationsInput | string
    isAsync?: BoolFieldUpdateOperationsInput | boolean
    courseId?: IntFieldUpdateOperationsInput | number
    discussionGroupId?: NullableIntFieldUpdateOperationsInput | number | null
    type?: StringFieldUpdateOperationsInput | string
  }

  export type MeetingCreateInput = {
    day: $Enums.Day
    startTime: Date | string
    endTime: Date | string
    location?: string | null
    section: SectionCreateNestedOneWithoutMeetingsInput
  }

  export type MeetingUncheckedCreateInput = {
    id?: number
    day: $Enums.Day
    startTime: Date | string
    endTime: Date | string
    location?: string | null
    sectionId: number
  }

  export type MeetingUpdateInput = {
    day?: EnumDayFieldUpdateOperationsInput | $Enums.Day
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    section?: SectionUpdateOneRequiredWithoutMeetingsNestedInput
  }

  export type MeetingUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    day?: EnumDayFieldUpdateOperationsInput | $Enums.Day
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    sectionId?: IntFieldUpdateOperationsInput | number
  }

  export type MeetingCreateManyInput = {
    id?: number
    day: $Enums.Day
    startTime: Date | string
    endTime: Date | string
    location?: string | null
    sectionId: number
  }

  export type MeetingUpdateManyMutationInput = {
    day?: EnumDayFieldUpdateOperationsInput | $Enums.Day
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MeetingUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    day?: EnumDayFieldUpdateOperationsInput | $Enums.Day
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    sectionId?: IntFieldUpdateOperationsInput | number
  }

  export type InstructorCreateInput = {
    firstName: string
    lastName: string
    title?: string | null
    email?: string | null
    phone?: string | null
    sections?: SectionCreateNestedManyWithoutInstructorsInput
    departments?: DepartmentCreateNestedManyWithoutInstructorsInput
  }

  export type InstructorUncheckedCreateInput = {
    id?: number
    firstName: string
    lastName: string
    title?: string | null
    email?: string | null
    phone?: string | null
    sections?: SectionUncheckedCreateNestedManyWithoutInstructorsInput
    departments?: DepartmentUncheckedCreateNestedManyWithoutInstructorsInput
  }

  export type InstructorUpdateInput = {
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    sections?: SectionUpdateManyWithoutInstructorsNestedInput
    departments?: DepartmentUpdateManyWithoutInstructorsNestedInput
  }

  export type InstructorUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    sections?: SectionUncheckedUpdateManyWithoutInstructorsNestedInput
    departments?: DepartmentUncheckedUpdateManyWithoutInstructorsNestedInput
  }

  export type InstructorCreateManyInput = {
    id?: number
    firstName: string
    lastName: string
    title?: string | null
    email?: string | null
    phone?: string | null
  }

  export type InstructorUpdateManyMutationInput = {
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type InstructorUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type CourseListRelationFilter = {
    every?: CourseWhereInput
    some?: CourseWhereInput
    none?: CourseWhereInput
  }

  export type InstructorListRelationFilter = {
    every?: InstructorWhereInput
    some?: InstructorWhereInput
    none?: InstructorWhereInput
  }

  export type CourseOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type InstructorOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DepartmentCountOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    title?: SortOrder
  }

  export type DepartmentAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type DepartmentMaxOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    title?: SortOrder
  }

  export type DepartmentMinOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    title?: SortOrder
  }

  export type DepartmentSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type SectionListRelationFilter = {
    every?: SectionWhereInput
    some?: SectionWhereInput
    none?: SectionWhereInput
  }

  export type DiscussionGroupListRelationFilter = {
    every?: DiscussionGroupWhereInput
    some?: DiscussionGroupWhereInput
    none?: DiscussionGroupWhereInput
  }

  export type DepartmentScalarRelationFilter = {
    is?: DepartmentWhereInput
    isNot?: DepartmentWhereInput
  }

  export type SectionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DiscussionGroupOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CourseDepartmentIdCodeCompoundUniqueInput = {
    departmentId: number
    code: string
  }

  export type CourseCountOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    title?: SortOrder
    description?: SortOrder
    departmentId?: SortOrder
  }

  export type CourseAvgOrderByAggregateInput = {
    id?: SortOrder
    departmentId?: SortOrder
  }

  export type CourseMaxOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    title?: SortOrder
    description?: SortOrder
    departmentId?: SortOrder
  }

  export type CourseMinOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    title?: SortOrder
    description?: SortOrder
    departmentId?: SortOrder
  }

  export type CourseSumOrderByAggregateInput = {
    id?: SortOrder
    departmentId?: SortOrder
  }

  export type CourseScalarRelationFilter = {
    is?: CourseWhereInput
    isNot?: CourseWhereInput
  }

  export type DiscussionGroupCourseIdTermCompoundUniqueInput = {
    courseId: number
    term: string
  }

  export type DiscussionGroupCountOrderByAggregateInput = {
    id?: SortOrder
    courseId?: SortOrder
    term?: SortOrder
  }

  export type DiscussionGroupAvgOrderByAggregateInput = {
    id?: SortOrder
    courseId?: SortOrder
  }

  export type DiscussionGroupMaxOrderByAggregateInput = {
    id?: SortOrder
    courseId?: SortOrder
    term?: SortOrder
  }

  export type DiscussionGroupMinOrderByAggregateInput = {
    id?: SortOrder
    courseId?: SortOrder
    term?: SortOrder
  }

  export type DiscussionGroupSumOrderByAggregateInput = {
    id?: SortOrder
    courseId?: SortOrder
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type MeetingListRelationFilter = {
    every?: MeetingWhereInput
    some?: MeetingWhereInput
    none?: MeetingWhereInput
  }

  export type DiscussionGroupNullableScalarRelationFilter = {
    is?: DiscussionGroupWhereInput | null
    isNot?: DiscussionGroupWhereInput | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type MeetingOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SectionClassNumberTermCompoundUniqueInput = {
    classNumber: string
    term: string
  }

  export type SectionCountOrderByAggregateInput = {
    id?: SortOrder
    sectionNumber?: SortOrder
    classNumber?: SortOrder
    term?: SortOrder
    isAsync?: SortOrder
    courseId?: SortOrder
    discussionGroupId?: SortOrder
    type?: SortOrder
  }

  export type SectionAvgOrderByAggregateInput = {
    id?: SortOrder
    courseId?: SortOrder
    discussionGroupId?: SortOrder
  }

  export type SectionMaxOrderByAggregateInput = {
    id?: SortOrder
    sectionNumber?: SortOrder
    classNumber?: SortOrder
    term?: SortOrder
    isAsync?: SortOrder
    courseId?: SortOrder
    discussionGroupId?: SortOrder
    type?: SortOrder
  }

  export type SectionMinOrderByAggregateInput = {
    id?: SortOrder
    sectionNumber?: SortOrder
    classNumber?: SortOrder
    term?: SortOrder
    isAsync?: SortOrder
    courseId?: SortOrder
    discussionGroupId?: SortOrder
    type?: SortOrder
  }

  export type SectionSumOrderByAggregateInput = {
    id?: SortOrder
    courseId?: SortOrder
    discussionGroupId?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type EnumDayFilter<$PrismaModel = never> = {
    equals?: $Enums.Day | EnumDayFieldRefInput<$PrismaModel>
    in?: $Enums.Day[] | ListEnumDayFieldRefInput<$PrismaModel>
    notIn?: $Enums.Day[] | ListEnumDayFieldRefInput<$PrismaModel>
    not?: NestedEnumDayFilter<$PrismaModel> | $Enums.Day
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type SectionScalarRelationFilter = {
    is?: SectionWhereInput
    isNot?: SectionWhereInput
  }

  export type MeetingSectionIdDayStartTimeEndTimeCompoundUniqueInput = {
    sectionId: number
    day: $Enums.Day
    startTime: Date | string
    endTime: Date | string
  }

  export type MeetingCountOrderByAggregateInput = {
    id?: SortOrder
    day?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    location?: SortOrder
    sectionId?: SortOrder
  }

  export type MeetingAvgOrderByAggregateInput = {
    id?: SortOrder
    sectionId?: SortOrder
  }

  export type MeetingMaxOrderByAggregateInput = {
    id?: SortOrder
    day?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    location?: SortOrder
    sectionId?: SortOrder
  }

  export type MeetingMinOrderByAggregateInput = {
    id?: SortOrder
    day?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    location?: SortOrder
    sectionId?: SortOrder
  }

  export type MeetingSumOrderByAggregateInput = {
    id?: SortOrder
    sectionId?: SortOrder
  }

  export type EnumDayWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Day | EnumDayFieldRefInput<$PrismaModel>
    in?: $Enums.Day[] | ListEnumDayFieldRefInput<$PrismaModel>
    notIn?: $Enums.Day[] | ListEnumDayFieldRefInput<$PrismaModel>
    not?: NestedEnumDayWithAggregatesFilter<$PrismaModel> | $Enums.Day
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDayFilter<$PrismaModel>
    _max?: NestedEnumDayFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DepartmentListRelationFilter = {
    every?: DepartmentWhereInput
    some?: DepartmentWhereInput
    none?: DepartmentWhereInput
  }

  export type DepartmentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type InstructorCountOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    title?: SortOrder
    email?: SortOrder
    phone?: SortOrder
  }

  export type InstructorAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type InstructorMaxOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    title?: SortOrder
    email?: SortOrder
    phone?: SortOrder
  }

  export type InstructorMinOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    title?: SortOrder
    email?: SortOrder
    phone?: SortOrder
  }

  export type InstructorSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type CourseCreateNestedManyWithoutDepartmentInput = {
    create?: XOR<CourseCreateWithoutDepartmentInput, CourseUncheckedCreateWithoutDepartmentInput> | CourseCreateWithoutDepartmentInput[] | CourseUncheckedCreateWithoutDepartmentInput[]
    connectOrCreate?: CourseCreateOrConnectWithoutDepartmentInput | CourseCreateOrConnectWithoutDepartmentInput[]
    createMany?: CourseCreateManyDepartmentInputEnvelope
    connect?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
  }

  export type InstructorCreateNestedManyWithoutDepartmentsInput = {
    create?: XOR<InstructorCreateWithoutDepartmentsInput, InstructorUncheckedCreateWithoutDepartmentsInput> | InstructorCreateWithoutDepartmentsInput[] | InstructorUncheckedCreateWithoutDepartmentsInput[]
    connectOrCreate?: InstructorCreateOrConnectWithoutDepartmentsInput | InstructorCreateOrConnectWithoutDepartmentsInput[]
    connect?: InstructorWhereUniqueInput | InstructorWhereUniqueInput[]
  }

  export type CourseUncheckedCreateNestedManyWithoutDepartmentInput = {
    create?: XOR<CourseCreateWithoutDepartmentInput, CourseUncheckedCreateWithoutDepartmentInput> | CourseCreateWithoutDepartmentInput[] | CourseUncheckedCreateWithoutDepartmentInput[]
    connectOrCreate?: CourseCreateOrConnectWithoutDepartmentInput | CourseCreateOrConnectWithoutDepartmentInput[]
    createMany?: CourseCreateManyDepartmentInputEnvelope
    connect?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
  }

  export type InstructorUncheckedCreateNestedManyWithoutDepartmentsInput = {
    create?: XOR<InstructorCreateWithoutDepartmentsInput, InstructorUncheckedCreateWithoutDepartmentsInput> | InstructorCreateWithoutDepartmentsInput[] | InstructorUncheckedCreateWithoutDepartmentsInput[]
    connectOrCreate?: InstructorCreateOrConnectWithoutDepartmentsInput | InstructorCreateOrConnectWithoutDepartmentsInput[]
    connect?: InstructorWhereUniqueInput | InstructorWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type CourseUpdateManyWithoutDepartmentNestedInput = {
    create?: XOR<CourseCreateWithoutDepartmentInput, CourseUncheckedCreateWithoutDepartmentInput> | CourseCreateWithoutDepartmentInput[] | CourseUncheckedCreateWithoutDepartmentInput[]
    connectOrCreate?: CourseCreateOrConnectWithoutDepartmentInput | CourseCreateOrConnectWithoutDepartmentInput[]
    upsert?: CourseUpsertWithWhereUniqueWithoutDepartmentInput | CourseUpsertWithWhereUniqueWithoutDepartmentInput[]
    createMany?: CourseCreateManyDepartmentInputEnvelope
    set?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
    disconnect?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
    delete?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
    connect?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
    update?: CourseUpdateWithWhereUniqueWithoutDepartmentInput | CourseUpdateWithWhereUniqueWithoutDepartmentInput[]
    updateMany?: CourseUpdateManyWithWhereWithoutDepartmentInput | CourseUpdateManyWithWhereWithoutDepartmentInput[]
    deleteMany?: CourseScalarWhereInput | CourseScalarWhereInput[]
  }

  export type InstructorUpdateManyWithoutDepartmentsNestedInput = {
    create?: XOR<InstructorCreateWithoutDepartmentsInput, InstructorUncheckedCreateWithoutDepartmentsInput> | InstructorCreateWithoutDepartmentsInput[] | InstructorUncheckedCreateWithoutDepartmentsInput[]
    connectOrCreate?: InstructorCreateOrConnectWithoutDepartmentsInput | InstructorCreateOrConnectWithoutDepartmentsInput[]
    upsert?: InstructorUpsertWithWhereUniqueWithoutDepartmentsInput | InstructorUpsertWithWhereUniqueWithoutDepartmentsInput[]
    set?: InstructorWhereUniqueInput | InstructorWhereUniqueInput[]
    disconnect?: InstructorWhereUniqueInput | InstructorWhereUniqueInput[]
    delete?: InstructorWhereUniqueInput | InstructorWhereUniqueInput[]
    connect?: InstructorWhereUniqueInput | InstructorWhereUniqueInput[]
    update?: InstructorUpdateWithWhereUniqueWithoutDepartmentsInput | InstructorUpdateWithWhereUniqueWithoutDepartmentsInput[]
    updateMany?: InstructorUpdateManyWithWhereWithoutDepartmentsInput | InstructorUpdateManyWithWhereWithoutDepartmentsInput[]
    deleteMany?: InstructorScalarWhereInput | InstructorScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type CourseUncheckedUpdateManyWithoutDepartmentNestedInput = {
    create?: XOR<CourseCreateWithoutDepartmentInput, CourseUncheckedCreateWithoutDepartmentInput> | CourseCreateWithoutDepartmentInput[] | CourseUncheckedCreateWithoutDepartmentInput[]
    connectOrCreate?: CourseCreateOrConnectWithoutDepartmentInput | CourseCreateOrConnectWithoutDepartmentInput[]
    upsert?: CourseUpsertWithWhereUniqueWithoutDepartmentInput | CourseUpsertWithWhereUniqueWithoutDepartmentInput[]
    createMany?: CourseCreateManyDepartmentInputEnvelope
    set?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
    disconnect?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
    delete?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
    connect?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
    update?: CourseUpdateWithWhereUniqueWithoutDepartmentInput | CourseUpdateWithWhereUniqueWithoutDepartmentInput[]
    updateMany?: CourseUpdateManyWithWhereWithoutDepartmentInput | CourseUpdateManyWithWhereWithoutDepartmentInput[]
    deleteMany?: CourseScalarWhereInput | CourseScalarWhereInput[]
  }

  export type InstructorUncheckedUpdateManyWithoutDepartmentsNestedInput = {
    create?: XOR<InstructorCreateWithoutDepartmentsInput, InstructorUncheckedCreateWithoutDepartmentsInput> | InstructorCreateWithoutDepartmentsInput[] | InstructorUncheckedCreateWithoutDepartmentsInput[]
    connectOrCreate?: InstructorCreateOrConnectWithoutDepartmentsInput | InstructorCreateOrConnectWithoutDepartmentsInput[]
    upsert?: InstructorUpsertWithWhereUniqueWithoutDepartmentsInput | InstructorUpsertWithWhereUniqueWithoutDepartmentsInput[]
    set?: InstructorWhereUniqueInput | InstructorWhereUniqueInput[]
    disconnect?: InstructorWhereUniqueInput | InstructorWhereUniqueInput[]
    delete?: InstructorWhereUniqueInput | InstructorWhereUniqueInput[]
    connect?: InstructorWhereUniqueInput | InstructorWhereUniqueInput[]
    update?: InstructorUpdateWithWhereUniqueWithoutDepartmentsInput | InstructorUpdateWithWhereUniqueWithoutDepartmentsInput[]
    updateMany?: InstructorUpdateManyWithWhereWithoutDepartmentsInput | InstructorUpdateManyWithWhereWithoutDepartmentsInput[]
    deleteMany?: InstructorScalarWhereInput | InstructorScalarWhereInput[]
  }

  export type SectionCreateNestedManyWithoutCourseInput = {
    create?: XOR<SectionCreateWithoutCourseInput, SectionUncheckedCreateWithoutCourseInput> | SectionCreateWithoutCourseInput[] | SectionUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: SectionCreateOrConnectWithoutCourseInput | SectionCreateOrConnectWithoutCourseInput[]
    createMany?: SectionCreateManyCourseInputEnvelope
    connect?: SectionWhereUniqueInput | SectionWhereUniqueInput[]
  }

  export type DiscussionGroupCreateNestedManyWithoutCourseInput = {
    create?: XOR<DiscussionGroupCreateWithoutCourseInput, DiscussionGroupUncheckedCreateWithoutCourseInput> | DiscussionGroupCreateWithoutCourseInput[] | DiscussionGroupUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: DiscussionGroupCreateOrConnectWithoutCourseInput | DiscussionGroupCreateOrConnectWithoutCourseInput[]
    createMany?: DiscussionGroupCreateManyCourseInputEnvelope
    connect?: DiscussionGroupWhereUniqueInput | DiscussionGroupWhereUniqueInput[]
  }

  export type DepartmentCreateNestedOneWithoutCoursesInput = {
    create?: XOR<DepartmentCreateWithoutCoursesInput, DepartmentUncheckedCreateWithoutCoursesInput>
    connectOrCreate?: DepartmentCreateOrConnectWithoutCoursesInput
    connect?: DepartmentWhereUniqueInput
  }

  export type SectionUncheckedCreateNestedManyWithoutCourseInput = {
    create?: XOR<SectionCreateWithoutCourseInput, SectionUncheckedCreateWithoutCourseInput> | SectionCreateWithoutCourseInput[] | SectionUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: SectionCreateOrConnectWithoutCourseInput | SectionCreateOrConnectWithoutCourseInput[]
    createMany?: SectionCreateManyCourseInputEnvelope
    connect?: SectionWhereUniqueInput | SectionWhereUniqueInput[]
  }

  export type DiscussionGroupUncheckedCreateNestedManyWithoutCourseInput = {
    create?: XOR<DiscussionGroupCreateWithoutCourseInput, DiscussionGroupUncheckedCreateWithoutCourseInput> | DiscussionGroupCreateWithoutCourseInput[] | DiscussionGroupUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: DiscussionGroupCreateOrConnectWithoutCourseInput | DiscussionGroupCreateOrConnectWithoutCourseInput[]
    createMany?: DiscussionGroupCreateManyCourseInputEnvelope
    connect?: DiscussionGroupWhereUniqueInput | DiscussionGroupWhereUniqueInput[]
  }

  export type SectionUpdateManyWithoutCourseNestedInput = {
    create?: XOR<SectionCreateWithoutCourseInput, SectionUncheckedCreateWithoutCourseInput> | SectionCreateWithoutCourseInput[] | SectionUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: SectionCreateOrConnectWithoutCourseInput | SectionCreateOrConnectWithoutCourseInput[]
    upsert?: SectionUpsertWithWhereUniqueWithoutCourseInput | SectionUpsertWithWhereUniqueWithoutCourseInput[]
    createMany?: SectionCreateManyCourseInputEnvelope
    set?: SectionWhereUniqueInput | SectionWhereUniqueInput[]
    disconnect?: SectionWhereUniqueInput | SectionWhereUniqueInput[]
    delete?: SectionWhereUniqueInput | SectionWhereUniqueInput[]
    connect?: SectionWhereUniqueInput | SectionWhereUniqueInput[]
    update?: SectionUpdateWithWhereUniqueWithoutCourseInput | SectionUpdateWithWhereUniqueWithoutCourseInput[]
    updateMany?: SectionUpdateManyWithWhereWithoutCourseInput | SectionUpdateManyWithWhereWithoutCourseInput[]
    deleteMany?: SectionScalarWhereInput | SectionScalarWhereInput[]
  }

  export type DiscussionGroupUpdateManyWithoutCourseNestedInput = {
    create?: XOR<DiscussionGroupCreateWithoutCourseInput, DiscussionGroupUncheckedCreateWithoutCourseInput> | DiscussionGroupCreateWithoutCourseInput[] | DiscussionGroupUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: DiscussionGroupCreateOrConnectWithoutCourseInput | DiscussionGroupCreateOrConnectWithoutCourseInput[]
    upsert?: DiscussionGroupUpsertWithWhereUniqueWithoutCourseInput | DiscussionGroupUpsertWithWhereUniqueWithoutCourseInput[]
    createMany?: DiscussionGroupCreateManyCourseInputEnvelope
    set?: DiscussionGroupWhereUniqueInput | DiscussionGroupWhereUniqueInput[]
    disconnect?: DiscussionGroupWhereUniqueInput | DiscussionGroupWhereUniqueInput[]
    delete?: DiscussionGroupWhereUniqueInput | DiscussionGroupWhereUniqueInput[]
    connect?: DiscussionGroupWhereUniqueInput | DiscussionGroupWhereUniqueInput[]
    update?: DiscussionGroupUpdateWithWhereUniqueWithoutCourseInput | DiscussionGroupUpdateWithWhereUniqueWithoutCourseInput[]
    updateMany?: DiscussionGroupUpdateManyWithWhereWithoutCourseInput | DiscussionGroupUpdateManyWithWhereWithoutCourseInput[]
    deleteMany?: DiscussionGroupScalarWhereInput | DiscussionGroupScalarWhereInput[]
  }

  export type DepartmentUpdateOneRequiredWithoutCoursesNestedInput = {
    create?: XOR<DepartmentCreateWithoutCoursesInput, DepartmentUncheckedCreateWithoutCoursesInput>
    connectOrCreate?: DepartmentCreateOrConnectWithoutCoursesInput
    upsert?: DepartmentUpsertWithoutCoursesInput
    connect?: DepartmentWhereUniqueInput
    update?: XOR<XOR<DepartmentUpdateToOneWithWhereWithoutCoursesInput, DepartmentUpdateWithoutCoursesInput>, DepartmentUncheckedUpdateWithoutCoursesInput>
  }

  export type SectionUncheckedUpdateManyWithoutCourseNestedInput = {
    create?: XOR<SectionCreateWithoutCourseInput, SectionUncheckedCreateWithoutCourseInput> | SectionCreateWithoutCourseInput[] | SectionUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: SectionCreateOrConnectWithoutCourseInput | SectionCreateOrConnectWithoutCourseInput[]
    upsert?: SectionUpsertWithWhereUniqueWithoutCourseInput | SectionUpsertWithWhereUniqueWithoutCourseInput[]
    createMany?: SectionCreateManyCourseInputEnvelope
    set?: SectionWhereUniqueInput | SectionWhereUniqueInput[]
    disconnect?: SectionWhereUniqueInput | SectionWhereUniqueInput[]
    delete?: SectionWhereUniqueInput | SectionWhereUniqueInput[]
    connect?: SectionWhereUniqueInput | SectionWhereUniqueInput[]
    update?: SectionUpdateWithWhereUniqueWithoutCourseInput | SectionUpdateWithWhereUniqueWithoutCourseInput[]
    updateMany?: SectionUpdateManyWithWhereWithoutCourseInput | SectionUpdateManyWithWhereWithoutCourseInput[]
    deleteMany?: SectionScalarWhereInput | SectionScalarWhereInput[]
  }

  export type DiscussionGroupUncheckedUpdateManyWithoutCourseNestedInput = {
    create?: XOR<DiscussionGroupCreateWithoutCourseInput, DiscussionGroupUncheckedCreateWithoutCourseInput> | DiscussionGroupCreateWithoutCourseInput[] | DiscussionGroupUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: DiscussionGroupCreateOrConnectWithoutCourseInput | DiscussionGroupCreateOrConnectWithoutCourseInput[]
    upsert?: DiscussionGroupUpsertWithWhereUniqueWithoutCourseInput | DiscussionGroupUpsertWithWhereUniqueWithoutCourseInput[]
    createMany?: DiscussionGroupCreateManyCourseInputEnvelope
    set?: DiscussionGroupWhereUniqueInput | DiscussionGroupWhereUniqueInput[]
    disconnect?: DiscussionGroupWhereUniqueInput | DiscussionGroupWhereUniqueInput[]
    delete?: DiscussionGroupWhereUniqueInput | DiscussionGroupWhereUniqueInput[]
    connect?: DiscussionGroupWhereUniqueInput | DiscussionGroupWhereUniqueInput[]
    update?: DiscussionGroupUpdateWithWhereUniqueWithoutCourseInput | DiscussionGroupUpdateWithWhereUniqueWithoutCourseInput[]
    updateMany?: DiscussionGroupUpdateManyWithWhereWithoutCourseInput | DiscussionGroupUpdateManyWithWhereWithoutCourseInput[]
    deleteMany?: DiscussionGroupScalarWhereInput | DiscussionGroupScalarWhereInput[]
  }

  export type SectionCreateNestedManyWithoutDiscussionGroupInput = {
    create?: XOR<SectionCreateWithoutDiscussionGroupInput, SectionUncheckedCreateWithoutDiscussionGroupInput> | SectionCreateWithoutDiscussionGroupInput[] | SectionUncheckedCreateWithoutDiscussionGroupInput[]
    connectOrCreate?: SectionCreateOrConnectWithoutDiscussionGroupInput | SectionCreateOrConnectWithoutDiscussionGroupInput[]
    createMany?: SectionCreateManyDiscussionGroupInputEnvelope
    connect?: SectionWhereUniqueInput | SectionWhereUniqueInput[]
  }

  export type CourseCreateNestedOneWithoutDiscussionGroupsInput = {
    create?: XOR<CourseCreateWithoutDiscussionGroupsInput, CourseUncheckedCreateWithoutDiscussionGroupsInput>
    connectOrCreate?: CourseCreateOrConnectWithoutDiscussionGroupsInput
    connect?: CourseWhereUniqueInput
  }

  export type SectionUncheckedCreateNestedManyWithoutDiscussionGroupInput = {
    create?: XOR<SectionCreateWithoutDiscussionGroupInput, SectionUncheckedCreateWithoutDiscussionGroupInput> | SectionCreateWithoutDiscussionGroupInput[] | SectionUncheckedCreateWithoutDiscussionGroupInput[]
    connectOrCreate?: SectionCreateOrConnectWithoutDiscussionGroupInput | SectionCreateOrConnectWithoutDiscussionGroupInput[]
    createMany?: SectionCreateManyDiscussionGroupInputEnvelope
    connect?: SectionWhereUniqueInput | SectionWhereUniqueInput[]
  }

  export type SectionUpdateManyWithoutDiscussionGroupNestedInput = {
    create?: XOR<SectionCreateWithoutDiscussionGroupInput, SectionUncheckedCreateWithoutDiscussionGroupInput> | SectionCreateWithoutDiscussionGroupInput[] | SectionUncheckedCreateWithoutDiscussionGroupInput[]
    connectOrCreate?: SectionCreateOrConnectWithoutDiscussionGroupInput | SectionCreateOrConnectWithoutDiscussionGroupInput[]
    upsert?: SectionUpsertWithWhereUniqueWithoutDiscussionGroupInput | SectionUpsertWithWhereUniqueWithoutDiscussionGroupInput[]
    createMany?: SectionCreateManyDiscussionGroupInputEnvelope
    set?: SectionWhereUniqueInput | SectionWhereUniqueInput[]
    disconnect?: SectionWhereUniqueInput | SectionWhereUniqueInput[]
    delete?: SectionWhereUniqueInput | SectionWhereUniqueInput[]
    connect?: SectionWhereUniqueInput | SectionWhereUniqueInput[]
    update?: SectionUpdateWithWhereUniqueWithoutDiscussionGroupInput | SectionUpdateWithWhereUniqueWithoutDiscussionGroupInput[]
    updateMany?: SectionUpdateManyWithWhereWithoutDiscussionGroupInput | SectionUpdateManyWithWhereWithoutDiscussionGroupInput[]
    deleteMany?: SectionScalarWhereInput | SectionScalarWhereInput[]
  }

  export type CourseUpdateOneRequiredWithoutDiscussionGroupsNestedInput = {
    create?: XOR<CourseCreateWithoutDiscussionGroupsInput, CourseUncheckedCreateWithoutDiscussionGroupsInput>
    connectOrCreate?: CourseCreateOrConnectWithoutDiscussionGroupsInput
    upsert?: CourseUpsertWithoutDiscussionGroupsInput
    connect?: CourseWhereUniqueInput
    update?: XOR<XOR<CourseUpdateToOneWithWhereWithoutDiscussionGroupsInput, CourseUpdateWithoutDiscussionGroupsInput>, CourseUncheckedUpdateWithoutDiscussionGroupsInput>
  }

  export type SectionUncheckedUpdateManyWithoutDiscussionGroupNestedInput = {
    create?: XOR<SectionCreateWithoutDiscussionGroupInput, SectionUncheckedCreateWithoutDiscussionGroupInput> | SectionCreateWithoutDiscussionGroupInput[] | SectionUncheckedCreateWithoutDiscussionGroupInput[]
    connectOrCreate?: SectionCreateOrConnectWithoutDiscussionGroupInput | SectionCreateOrConnectWithoutDiscussionGroupInput[]
    upsert?: SectionUpsertWithWhereUniqueWithoutDiscussionGroupInput | SectionUpsertWithWhereUniqueWithoutDiscussionGroupInput[]
    createMany?: SectionCreateManyDiscussionGroupInputEnvelope
    set?: SectionWhereUniqueInput | SectionWhereUniqueInput[]
    disconnect?: SectionWhereUniqueInput | SectionWhereUniqueInput[]
    delete?: SectionWhereUniqueInput | SectionWhereUniqueInput[]
    connect?: SectionWhereUniqueInput | SectionWhereUniqueInput[]
    update?: SectionUpdateWithWhereUniqueWithoutDiscussionGroupInput | SectionUpdateWithWhereUniqueWithoutDiscussionGroupInput[]
    updateMany?: SectionUpdateManyWithWhereWithoutDiscussionGroupInput | SectionUpdateManyWithWhereWithoutDiscussionGroupInput[]
    deleteMany?: SectionScalarWhereInput | SectionScalarWhereInput[]
  }

  export type MeetingCreateNestedManyWithoutSectionInput = {
    create?: XOR<MeetingCreateWithoutSectionInput, MeetingUncheckedCreateWithoutSectionInput> | MeetingCreateWithoutSectionInput[] | MeetingUncheckedCreateWithoutSectionInput[]
    connectOrCreate?: MeetingCreateOrConnectWithoutSectionInput | MeetingCreateOrConnectWithoutSectionInput[]
    createMany?: MeetingCreateManySectionInputEnvelope
    connect?: MeetingWhereUniqueInput | MeetingWhereUniqueInput[]
  }

  export type InstructorCreateNestedManyWithoutSectionsInput = {
    create?: XOR<InstructorCreateWithoutSectionsInput, InstructorUncheckedCreateWithoutSectionsInput> | InstructorCreateWithoutSectionsInput[] | InstructorUncheckedCreateWithoutSectionsInput[]
    connectOrCreate?: InstructorCreateOrConnectWithoutSectionsInput | InstructorCreateOrConnectWithoutSectionsInput[]
    connect?: InstructorWhereUniqueInput | InstructorWhereUniqueInput[]
  }

  export type CourseCreateNestedOneWithoutSectionsInput = {
    create?: XOR<CourseCreateWithoutSectionsInput, CourseUncheckedCreateWithoutSectionsInput>
    connectOrCreate?: CourseCreateOrConnectWithoutSectionsInput
    connect?: CourseWhereUniqueInput
  }

  export type DiscussionGroupCreateNestedOneWithoutSectionsInput = {
    create?: XOR<DiscussionGroupCreateWithoutSectionsInput, DiscussionGroupUncheckedCreateWithoutSectionsInput>
    connectOrCreate?: DiscussionGroupCreateOrConnectWithoutSectionsInput
    connect?: DiscussionGroupWhereUniqueInput
  }

  export type MeetingUncheckedCreateNestedManyWithoutSectionInput = {
    create?: XOR<MeetingCreateWithoutSectionInput, MeetingUncheckedCreateWithoutSectionInput> | MeetingCreateWithoutSectionInput[] | MeetingUncheckedCreateWithoutSectionInput[]
    connectOrCreate?: MeetingCreateOrConnectWithoutSectionInput | MeetingCreateOrConnectWithoutSectionInput[]
    createMany?: MeetingCreateManySectionInputEnvelope
    connect?: MeetingWhereUniqueInput | MeetingWhereUniqueInput[]
  }

  export type InstructorUncheckedCreateNestedManyWithoutSectionsInput = {
    create?: XOR<InstructorCreateWithoutSectionsInput, InstructorUncheckedCreateWithoutSectionsInput> | InstructorCreateWithoutSectionsInput[] | InstructorUncheckedCreateWithoutSectionsInput[]
    connectOrCreate?: InstructorCreateOrConnectWithoutSectionsInput | InstructorCreateOrConnectWithoutSectionsInput[]
    connect?: InstructorWhereUniqueInput | InstructorWhereUniqueInput[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type MeetingUpdateManyWithoutSectionNestedInput = {
    create?: XOR<MeetingCreateWithoutSectionInput, MeetingUncheckedCreateWithoutSectionInput> | MeetingCreateWithoutSectionInput[] | MeetingUncheckedCreateWithoutSectionInput[]
    connectOrCreate?: MeetingCreateOrConnectWithoutSectionInput | MeetingCreateOrConnectWithoutSectionInput[]
    upsert?: MeetingUpsertWithWhereUniqueWithoutSectionInput | MeetingUpsertWithWhereUniqueWithoutSectionInput[]
    createMany?: MeetingCreateManySectionInputEnvelope
    set?: MeetingWhereUniqueInput | MeetingWhereUniqueInput[]
    disconnect?: MeetingWhereUniqueInput | MeetingWhereUniqueInput[]
    delete?: MeetingWhereUniqueInput | MeetingWhereUniqueInput[]
    connect?: MeetingWhereUniqueInput | MeetingWhereUniqueInput[]
    update?: MeetingUpdateWithWhereUniqueWithoutSectionInput | MeetingUpdateWithWhereUniqueWithoutSectionInput[]
    updateMany?: MeetingUpdateManyWithWhereWithoutSectionInput | MeetingUpdateManyWithWhereWithoutSectionInput[]
    deleteMany?: MeetingScalarWhereInput | MeetingScalarWhereInput[]
  }

  export type InstructorUpdateManyWithoutSectionsNestedInput = {
    create?: XOR<InstructorCreateWithoutSectionsInput, InstructorUncheckedCreateWithoutSectionsInput> | InstructorCreateWithoutSectionsInput[] | InstructorUncheckedCreateWithoutSectionsInput[]
    connectOrCreate?: InstructorCreateOrConnectWithoutSectionsInput | InstructorCreateOrConnectWithoutSectionsInput[]
    upsert?: InstructorUpsertWithWhereUniqueWithoutSectionsInput | InstructorUpsertWithWhereUniqueWithoutSectionsInput[]
    set?: InstructorWhereUniqueInput | InstructorWhereUniqueInput[]
    disconnect?: InstructorWhereUniqueInput | InstructorWhereUniqueInput[]
    delete?: InstructorWhereUniqueInput | InstructorWhereUniqueInput[]
    connect?: InstructorWhereUniqueInput | InstructorWhereUniqueInput[]
    update?: InstructorUpdateWithWhereUniqueWithoutSectionsInput | InstructorUpdateWithWhereUniqueWithoutSectionsInput[]
    updateMany?: InstructorUpdateManyWithWhereWithoutSectionsInput | InstructorUpdateManyWithWhereWithoutSectionsInput[]
    deleteMany?: InstructorScalarWhereInput | InstructorScalarWhereInput[]
  }

  export type CourseUpdateOneRequiredWithoutSectionsNestedInput = {
    create?: XOR<CourseCreateWithoutSectionsInput, CourseUncheckedCreateWithoutSectionsInput>
    connectOrCreate?: CourseCreateOrConnectWithoutSectionsInput
    upsert?: CourseUpsertWithoutSectionsInput
    connect?: CourseWhereUniqueInput
    update?: XOR<XOR<CourseUpdateToOneWithWhereWithoutSectionsInput, CourseUpdateWithoutSectionsInput>, CourseUncheckedUpdateWithoutSectionsInput>
  }

  export type DiscussionGroupUpdateOneWithoutSectionsNestedInput = {
    create?: XOR<DiscussionGroupCreateWithoutSectionsInput, DiscussionGroupUncheckedCreateWithoutSectionsInput>
    connectOrCreate?: DiscussionGroupCreateOrConnectWithoutSectionsInput
    upsert?: DiscussionGroupUpsertWithoutSectionsInput
    disconnect?: DiscussionGroupWhereInput | boolean
    delete?: DiscussionGroupWhereInput | boolean
    connect?: DiscussionGroupWhereUniqueInput
    update?: XOR<XOR<DiscussionGroupUpdateToOneWithWhereWithoutSectionsInput, DiscussionGroupUpdateWithoutSectionsInput>, DiscussionGroupUncheckedUpdateWithoutSectionsInput>
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type MeetingUncheckedUpdateManyWithoutSectionNestedInput = {
    create?: XOR<MeetingCreateWithoutSectionInput, MeetingUncheckedCreateWithoutSectionInput> | MeetingCreateWithoutSectionInput[] | MeetingUncheckedCreateWithoutSectionInput[]
    connectOrCreate?: MeetingCreateOrConnectWithoutSectionInput | MeetingCreateOrConnectWithoutSectionInput[]
    upsert?: MeetingUpsertWithWhereUniqueWithoutSectionInput | MeetingUpsertWithWhereUniqueWithoutSectionInput[]
    createMany?: MeetingCreateManySectionInputEnvelope
    set?: MeetingWhereUniqueInput | MeetingWhereUniqueInput[]
    disconnect?: MeetingWhereUniqueInput | MeetingWhereUniqueInput[]
    delete?: MeetingWhereUniqueInput | MeetingWhereUniqueInput[]
    connect?: MeetingWhereUniqueInput | MeetingWhereUniqueInput[]
    update?: MeetingUpdateWithWhereUniqueWithoutSectionInput | MeetingUpdateWithWhereUniqueWithoutSectionInput[]
    updateMany?: MeetingUpdateManyWithWhereWithoutSectionInput | MeetingUpdateManyWithWhereWithoutSectionInput[]
    deleteMany?: MeetingScalarWhereInput | MeetingScalarWhereInput[]
  }

  export type InstructorUncheckedUpdateManyWithoutSectionsNestedInput = {
    create?: XOR<InstructorCreateWithoutSectionsInput, InstructorUncheckedCreateWithoutSectionsInput> | InstructorCreateWithoutSectionsInput[] | InstructorUncheckedCreateWithoutSectionsInput[]
    connectOrCreate?: InstructorCreateOrConnectWithoutSectionsInput | InstructorCreateOrConnectWithoutSectionsInput[]
    upsert?: InstructorUpsertWithWhereUniqueWithoutSectionsInput | InstructorUpsertWithWhereUniqueWithoutSectionsInput[]
    set?: InstructorWhereUniqueInput | InstructorWhereUniqueInput[]
    disconnect?: InstructorWhereUniqueInput | InstructorWhereUniqueInput[]
    delete?: InstructorWhereUniqueInput | InstructorWhereUniqueInput[]
    connect?: InstructorWhereUniqueInput | InstructorWhereUniqueInput[]
    update?: InstructorUpdateWithWhereUniqueWithoutSectionsInput | InstructorUpdateWithWhereUniqueWithoutSectionsInput[]
    updateMany?: InstructorUpdateManyWithWhereWithoutSectionsInput | InstructorUpdateManyWithWhereWithoutSectionsInput[]
    deleteMany?: InstructorScalarWhereInput | InstructorScalarWhereInput[]
  }

  export type SectionCreateNestedOneWithoutMeetingsInput = {
    create?: XOR<SectionCreateWithoutMeetingsInput, SectionUncheckedCreateWithoutMeetingsInput>
    connectOrCreate?: SectionCreateOrConnectWithoutMeetingsInput
    connect?: SectionWhereUniqueInput
  }

  export type EnumDayFieldUpdateOperationsInput = {
    set?: $Enums.Day
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type SectionUpdateOneRequiredWithoutMeetingsNestedInput = {
    create?: XOR<SectionCreateWithoutMeetingsInput, SectionUncheckedCreateWithoutMeetingsInput>
    connectOrCreate?: SectionCreateOrConnectWithoutMeetingsInput
    upsert?: SectionUpsertWithoutMeetingsInput
    connect?: SectionWhereUniqueInput
    update?: XOR<XOR<SectionUpdateToOneWithWhereWithoutMeetingsInput, SectionUpdateWithoutMeetingsInput>, SectionUncheckedUpdateWithoutMeetingsInput>
  }

  export type SectionCreateNestedManyWithoutInstructorsInput = {
    create?: XOR<SectionCreateWithoutInstructorsInput, SectionUncheckedCreateWithoutInstructorsInput> | SectionCreateWithoutInstructorsInput[] | SectionUncheckedCreateWithoutInstructorsInput[]
    connectOrCreate?: SectionCreateOrConnectWithoutInstructorsInput | SectionCreateOrConnectWithoutInstructorsInput[]
    connect?: SectionWhereUniqueInput | SectionWhereUniqueInput[]
  }

  export type DepartmentCreateNestedManyWithoutInstructorsInput = {
    create?: XOR<DepartmentCreateWithoutInstructorsInput, DepartmentUncheckedCreateWithoutInstructorsInput> | DepartmentCreateWithoutInstructorsInput[] | DepartmentUncheckedCreateWithoutInstructorsInput[]
    connectOrCreate?: DepartmentCreateOrConnectWithoutInstructorsInput | DepartmentCreateOrConnectWithoutInstructorsInput[]
    connect?: DepartmentWhereUniqueInput | DepartmentWhereUniqueInput[]
  }

  export type SectionUncheckedCreateNestedManyWithoutInstructorsInput = {
    create?: XOR<SectionCreateWithoutInstructorsInput, SectionUncheckedCreateWithoutInstructorsInput> | SectionCreateWithoutInstructorsInput[] | SectionUncheckedCreateWithoutInstructorsInput[]
    connectOrCreate?: SectionCreateOrConnectWithoutInstructorsInput | SectionCreateOrConnectWithoutInstructorsInput[]
    connect?: SectionWhereUniqueInput | SectionWhereUniqueInput[]
  }

  export type DepartmentUncheckedCreateNestedManyWithoutInstructorsInput = {
    create?: XOR<DepartmentCreateWithoutInstructorsInput, DepartmentUncheckedCreateWithoutInstructorsInput> | DepartmentCreateWithoutInstructorsInput[] | DepartmentUncheckedCreateWithoutInstructorsInput[]
    connectOrCreate?: DepartmentCreateOrConnectWithoutInstructorsInput | DepartmentCreateOrConnectWithoutInstructorsInput[]
    connect?: DepartmentWhereUniqueInput | DepartmentWhereUniqueInput[]
  }

  export type SectionUpdateManyWithoutInstructorsNestedInput = {
    create?: XOR<SectionCreateWithoutInstructorsInput, SectionUncheckedCreateWithoutInstructorsInput> | SectionCreateWithoutInstructorsInput[] | SectionUncheckedCreateWithoutInstructorsInput[]
    connectOrCreate?: SectionCreateOrConnectWithoutInstructorsInput | SectionCreateOrConnectWithoutInstructorsInput[]
    upsert?: SectionUpsertWithWhereUniqueWithoutInstructorsInput | SectionUpsertWithWhereUniqueWithoutInstructorsInput[]
    set?: SectionWhereUniqueInput | SectionWhereUniqueInput[]
    disconnect?: SectionWhereUniqueInput | SectionWhereUniqueInput[]
    delete?: SectionWhereUniqueInput | SectionWhereUniqueInput[]
    connect?: SectionWhereUniqueInput | SectionWhereUniqueInput[]
    update?: SectionUpdateWithWhereUniqueWithoutInstructorsInput | SectionUpdateWithWhereUniqueWithoutInstructorsInput[]
    updateMany?: SectionUpdateManyWithWhereWithoutInstructorsInput | SectionUpdateManyWithWhereWithoutInstructorsInput[]
    deleteMany?: SectionScalarWhereInput | SectionScalarWhereInput[]
  }

  export type DepartmentUpdateManyWithoutInstructorsNestedInput = {
    create?: XOR<DepartmentCreateWithoutInstructorsInput, DepartmentUncheckedCreateWithoutInstructorsInput> | DepartmentCreateWithoutInstructorsInput[] | DepartmentUncheckedCreateWithoutInstructorsInput[]
    connectOrCreate?: DepartmentCreateOrConnectWithoutInstructorsInput | DepartmentCreateOrConnectWithoutInstructorsInput[]
    upsert?: DepartmentUpsertWithWhereUniqueWithoutInstructorsInput | DepartmentUpsertWithWhereUniqueWithoutInstructorsInput[]
    set?: DepartmentWhereUniqueInput | DepartmentWhereUniqueInput[]
    disconnect?: DepartmentWhereUniqueInput | DepartmentWhereUniqueInput[]
    delete?: DepartmentWhereUniqueInput | DepartmentWhereUniqueInput[]
    connect?: DepartmentWhereUniqueInput | DepartmentWhereUniqueInput[]
    update?: DepartmentUpdateWithWhereUniqueWithoutInstructorsInput | DepartmentUpdateWithWhereUniqueWithoutInstructorsInput[]
    updateMany?: DepartmentUpdateManyWithWhereWithoutInstructorsInput | DepartmentUpdateManyWithWhereWithoutInstructorsInput[]
    deleteMany?: DepartmentScalarWhereInput | DepartmentScalarWhereInput[]
  }

  export type SectionUncheckedUpdateManyWithoutInstructorsNestedInput = {
    create?: XOR<SectionCreateWithoutInstructorsInput, SectionUncheckedCreateWithoutInstructorsInput> | SectionCreateWithoutInstructorsInput[] | SectionUncheckedCreateWithoutInstructorsInput[]
    connectOrCreate?: SectionCreateOrConnectWithoutInstructorsInput | SectionCreateOrConnectWithoutInstructorsInput[]
    upsert?: SectionUpsertWithWhereUniqueWithoutInstructorsInput | SectionUpsertWithWhereUniqueWithoutInstructorsInput[]
    set?: SectionWhereUniqueInput | SectionWhereUniqueInput[]
    disconnect?: SectionWhereUniqueInput | SectionWhereUniqueInput[]
    delete?: SectionWhereUniqueInput | SectionWhereUniqueInput[]
    connect?: SectionWhereUniqueInput | SectionWhereUniqueInput[]
    update?: SectionUpdateWithWhereUniqueWithoutInstructorsInput | SectionUpdateWithWhereUniqueWithoutInstructorsInput[]
    updateMany?: SectionUpdateManyWithWhereWithoutInstructorsInput | SectionUpdateManyWithWhereWithoutInstructorsInput[]
    deleteMany?: SectionScalarWhereInput | SectionScalarWhereInput[]
  }

  export type DepartmentUncheckedUpdateManyWithoutInstructorsNestedInput = {
    create?: XOR<DepartmentCreateWithoutInstructorsInput, DepartmentUncheckedCreateWithoutInstructorsInput> | DepartmentCreateWithoutInstructorsInput[] | DepartmentUncheckedCreateWithoutInstructorsInput[]
    connectOrCreate?: DepartmentCreateOrConnectWithoutInstructorsInput | DepartmentCreateOrConnectWithoutInstructorsInput[]
    upsert?: DepartmentUpsertWithWhereUniqueWithoutInstructorsInput | DepartmentUpsertWithWhereUniqueWithoutInstructorsInput[]
    set?: DepartmentWhereUniqueInput | DepartmentWhereUniqueInput[]
    disconnect?: DepartmentWhereUniqueInput | DepartmentWhereUniqueInput[]
    delete?: DepartmentWhereUniqueInput | DepartmentWhereUniqueInput[]
    connect?: DepartmentWhereUniqueInput | DepartmentWhereUniqueInput[]
    update?: DepartmentUpdateWithWhereUniqueWithoutInstructorsInput | DepartmentUpdateWithWhereUniqueWithoutInstructorsInput[]
    updateMany?: DepartmentUpdateManyWithWhereWithoutInstructorsInput | DepartmentUpdateManyWithWhereWithoutInstructorsInput[]
    deleteMany?: DepartmentScalarWhereInput | DepartmentScalarWhereInput[]
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumDayFilter<$PrismaModel = never> = {
    equals?: $Enums.Day | EnumDayFieldRefInput<$PrismaModel>
    in?: $Enums.Day[] | ListEnumDayFieldRefInput<$PrismaModel>
    notIn?: $Enums.Day[] | ListEnumDayFieldRefInput<$PrismaModel>
    not?: NestedEnumDayFilter<$PrismaModel> | $Enums.Day
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumDayWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Day | EnumDayFieldRefInput<$PrismaModel>
    in?: $Enums.Day[] | ListEnumDayFieldRefInput<$PrismaModel>
    notIn?: $Enums.Day[] | ListEnumDayFieldRefInput<$PrismaModel>
    not?: NestedEnumDayWithAggregatesFilter<$PrismaModel> | $Enums.Day
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDayFilter<$PrismaModel>
    _max?: NestedEnumDayFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type CourseCreateWithoutDepartmentInput = {
    code: string
    title: string
    description: string
    sections?: SectionCreateNestedManyWithoutCourseInput
    discussionGroups?: DiscussionGroupCreateNestedManyWithoutCourseInput
  }

  export type CourseUncheckedCreateWithoutDepartmentInput = {
    id?: number
    code: string
    title: string
    description: string
    sections?: SectionUncheckedCreateNestedManyWithoutCourseInput
    discussionGroups?: DiscussionGroupUncheckedCreateNestedManyWithoutCourseInput
  }

  export type CourseCreateOrConnectWithoutDepartmentInput = {
    where: CourseWhereUniqueInput
    create: XOR<CourseCreateWithoutDepartmentInput, CourseUncheckedCreateWithoutDepartmentInput>
  }

  export type CourseCreateManyDepartmentInputEnvelope = {
    data: CourseCreateManyDepartmentInput | CourseCreateManyDepartmentInput[]
    skipDuplicates?: boolean
  }

  export type InstructorCreateWithoutDepartmentsInput = {
    firstName: string
    lastName: string
    title?: string | null
    email?: string | null
    phone?: string | null
    sections?: SectionCreateNestedManyWithoutInstructorsInput
  }

  export type InstructorUncheckedCreateWithoutDepartmentsInput = {
    id?: number
    firstName: string
    lastName: string
    title?: string | null
    email?: string | null
    phone?: string | null
    sections?: SectionUncheckedCreateNestedManyWithoutInstructorsInput
  }

  export type InstructorCreateOrConnectWithoutDepartmentsInput = {
    where: InstructorWhereUniqueInput
    create: XOR<InstructorCreateWithoutDepartmentsInput, InstructorUncheckedCreateWithoutDepartmentsInput>
  }

  export type CourseUpsertWithWhereUniqueWithoutDepartmentInput = {
    where: CourseWhereUniqueInput
    update: XOR<CourseUpdateWithoutDepartmentInput, CourseUncheckedUpdateWithoutDepartmentInput>
    create: XOR<CourseCreateWithoutDepartmentInput, CourseUncheckedCreateWithoutDepartmentInput>
  }

  export type CourseUpdateWithWhereUniqueWithoutDepartmentInput = {
    where: CourseWhereUniqueInput
    data: XOR<CourseUpdateWithoutDepartmentInput, CourseUncheckedUpdateWithoutDepartmentInput>
  }

  export type CourseUpdateManyWithWhereWithoutDepartmentInput = {
    where: CourseScalarWhereInput
    data: XOR<CourseUpdateManyMutationInput, CourseUncheckedUpdateManyWithoutDepartmentInput>
  }

  export type CourseScalarWhereInput = {
    AND?: CourseScalarWhereInput | CourseScalarWhereInput[]
    OR?: CourseScalarWhereInput[]
    NOT?: CourseScalarWhereInput | CourseScalarWhereInput[]
    id?: IntFilter<"Course"> | number
    code?: StringFilter<"Course"> | string
    title?: StringFilter<"Course"> | string
    description?: StringFilter<"Course"> | string
    departmentId?: IntFilter<"Course"> | number
  }

  export type InstructorUpsertWithWhereUniqueWithoutDepartmentsInput = {
    where: InstructorWhereUniqueInput
    update: XOR<InstructorUpdateWithoutDepartmentsInput, InstructorUncheckedUpdateWithoutDepartmentsInput>
    create: XOR<InstructorCreateWithoutDepartmentsInput, InstructorUncheckedCreateWithoutDepartmentsInput>
  }

  export type InstructorUpdateWithWhereUniqueWithoutDepartmentsInput = {
    where: InstructorWhereUniqueInput
    data: XOR<InstructorUpdateWithoutDepartmentsInput, InstructorUncheckedUpdateWithoutDepartmentsInput>
  }

  export type InstructorUpdateManyWithWhereWithoutDepartmentsInput = {
    where: InstructorScalarWhereInput
    data: XOR<InstructorUpdateManyMutationInput, InstructorUncheckedUpdateManyWithoutDepartmentsInput>
  }

  export type InstructorScalarWhereInput = {
    AND?: InstructorScalarWhereInput | InstructorScalarWhereInput[]
    OR?: InstructorScalarWhereInput[]
    NOT?: InstructorScalarWhereInput | InstructorScalarWhereInput[]
    id?: IntFilter<"Instructor"> | number
    firstName?: StringFilter<"Instructor"> | string
    lastName?: StringFilter<"Instructor"> | string
    title?: StringNullableFilter<"Instructor"> | string | null
    email?: StringNullableFilter<"Instructor"> | string | null
    phone?: StringNullableFilter<"Instructor"> | string | null
  }

  export type SectionCreateWithoutCourseInput = {
    sectionNumber: string
    classNumber: string
    term: string
    isAsync?: boolean
    type?: string
    meetings?: MeetingCreateNestedManyWithoutSectionInput
    instructors?: InstructorCreateNestedManyWithoutSectionsInput
    discussionGroup?: DiscussionGroupCreateNestedOneWithoutSectionsInput
  }

  export type SectionUncheckedCreateWithoutCourseInput = {
    id?: number
    sectionNumber: string
    classNumber: string
    term: string
    isAsync?: boolean
    discussionGroupId?: number | null
    type?: string
    meetings?: MeetingUncheckedCreateNestedManyWithoutSectionInput
    instructors?: InstructorUncheckedCreateNestedManyWithoutSectionsInput
  }

  export type SectionCreateOrConnectWithoutCourseInput = {
    where: SectionWhereUniqueInput
    create: XOR<SectionCreateWithoutCourseInput, SectionUncheckedCreateWithoutCourseInput>
  }

  export type SectionCreateManyCourseInputEnvelope = {
    data: SectionCreateManyCourseInput | SectionCreateManyCourseInput[]
    skipDuplicates?: boolean
  }

  export type DiscussionGroupCreateWithoutCourseInput = {
    term: string
    sections?: SectionCreateNestedManyWithoutDiscussionGroupInput
  }

  export type DiscussionGroupUncheckedCreateWithoutCourseInput = {
    id?: number
    term: string
    sections?: SectionUncheckedCreateNestedManyWithoutDiscussionGroupInput
  }

  export type DiscussionGroupCreateOrConnectWithoutCourseInput = {
    where: DiscussionGroupWhereUniqueInput
    create: XOR<DiscussionGroupCreateWithoutCourseInput, DiscussionGroupUncheckedCreateWithoutCourseInput>
  }

  export type DiscussionGroupCreateManyCourseInputEnvelope = {
    data: DiscussionGroupCreateManyCourseInput | DiscussionGroupCreateManyCourseInput[]
    skipDuplicates?: boolean
  }

  export type DepartmentCreateWithoutCoursesInput = {
    code: string
    title: string
    instructors?: InstructorCreateNestedManyWithoutDepartmentsInput
  }

  export type DepartmentUncheckedCreateWithoutCoursesInput = {
    id?: number
    code: string
    title: string
    instructors?: InstructorUncheckedCreateNestedManyWithoutDepartmentsInput
  }

  export type DepartmentCreateOrConnectWithoutCoursesInput = {
    where: DepartmentWhereUniqueInput
    create: XOR<DepartmentCreateWithoutCoursesInput, DepartmentUncheckedCreateWithoutCoursesInput>
  }

  export type SectionUpsertWithWhereUniqueWithoutCourseInput = {
    where: SectionWhereUniqueInput
    update: XOR<SectionUpdateWithoutCourseInput, SectionUncheckedUpdateWithoutCourseInput>
    create: XOR<SectionCreateWithoutCourseInput, SectionUncheckedCreateWithoutCourseInput>
  }

  export type SectionUpdateWithWhereUniqueWithoutCourseInput = {
    where: SectionWhereUniqueInput
    data: XOR<SectionUpdateWithoutCourseInput, SectionUncheckedUpdateWithoutCourseInput>
  }

  export type SectionUpdateManyWithWhereWithoutCourseInput = {
    where: SectionScalarWhereInput
    data: XOR<SectionUpdateManyMutationInput, SectionUncheckedUpdateManyWithoutCourseInput>
  }

  export type SectionScalarWhereInput = {
    AND?: SectionScalarWhereInput | SectionScalarWhereInput[]
    OR?: SectionScalarWhereInput[]
    NOT?: SectionScalarWhereInput | SectionScalarWhereInput[]
    id?: IntFilter<"Section"> | number
    sectionNumber?: StringFilter<"Section"> | string
    classNumber?: StringFilter<"Section"> | string
    term?: StringFilter<"Section"> | string
    isAsync?: BoolFilter<"Section"> | boolean
    courseId?: IntFilter<"Section"> | number
    discussionGroupId?: IntNullableFilter<"Section"> | number | null
    type?: StringFilter<"Section"> | string
  }

  export type DiscussionGroupUpsertWithWhereUniqueWithoutCourseInput = {
    where: DiscussionGroupWhereUniqueInput
    update: XOR<DiscussionGroupUpdateWithoutCourseInput, DiscussionGroupUncheckedUpdateWithoutCourseInput>
    create: XOR<DiscussionGroupCreateWithoutCourseInput, DiscussionGroupUncheckedCreateWithoutCourseInput>
  }

  export type DiscussionGroupUpdateWithWhereUniqueWithoutCourseInput = {
    where: DiscussionGroupWhereUniqueInput
    data: XOR<DiscussionGroupUpdateWithoutCourseInput, DiscussionGroupUncheckedUpdateWithoutCourseInput>
  }

  export type DiscussionGroupUpdateManyWithWhereWithoutCourseInput = {
    where: DiscussionGroupScalarWhereInput
    data: XOR<DiscussionGroupUpdateManyMutationInput, DiscussionGroupUncheckedUpdateManyWithoutCourseInput>
  }

  export type DiscussionGroupScalarWhereInput = {
    AND?: DiscussionGroupScalarWhereInput | DiscussionGroupScalarWhereInput[]
    OR?: DiscussionGroupScalarWhereInput[]
    NOT?: DiscussionGroupScalarWhereInput | DiscussionGroupScalarWhereInput[]
    id?: IntFilter<"DiscussionGroup"> | number
    courseId?: IntFilter<"DiscussionGroup"> | number
    term?: StringFilter<"DiscussionGroup"> | string
  }

  export type DepartmentUpsertWithoutCoursesInput = {
    update: XOR<DepartmentUpdateWithoutCoursesInput, DepartmentUncheckedUpdateWithoutCoursesInput>
    create: XOR<DepartmentCreateWithoutCoursesInput, DepartmentUncheckedCreateWithoutCoursesInput>
    where?: DepartmentWhereInput
  }

  export type DepartmentUpdateToOneWithWhereWithoutCoursesInput = {
    where?: DepartmentWhereInput
    data: XOR<DepartmentUpdateWithoutCoursesInput, DepartmentUncheckedUpdateWithoutCoursesInput>
  }

  export type DepartmentUpdateWithoutCoursesInput = {
    code?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    instructors?: InstructorUpdateManyWithoutDepartmentsNestedInput
  }

  export type DepartmentUncheckedUpdateWithoutCoursesInput = {
    id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    instructors?: InstructorUncheckedUpdateManyWithoutDepartmentsNestedInput
  }

  export type SectionCreateWithoutDiscussionGroupInput = {
    sectionNumber: string
    classNumber: string
    term: string
    isAsync?: boolean
    type?: string
    meetings?: MeetingCreateNestedManyWithoutSectionInput
    instructors?: InstructorCreateNestedManyWithoutSectionsInput
    course: CourseCreateNestedOneWithoutSectionsInput
  }

  export type SectionUncheckedCreateWithoutDiscussionGroupInput = {
    id?: number
    sectionNumber: string
    classNumber: string
    term: string
    isAsync?: boolean
    courseId: number
    type?: string
    meetings?: MeetingUncheckedCreateNestedManyWithoutSectionInput
    instructors?: InstructorUncheckedCreateNestedManyWithoutSectionsInput
  }

  export type SectionCreateOrConnectWithoutDiscussionGroupInput = {
    where: SectionWhereUniqueInput
    create: XOR<SectionCreateWithoutDiscussionGroupInput, SectionUncheckedCreateWithoutDiscussionGroupInput>
  }

  export type SectionCreateManyDiscussionGroupInputEnvelope = {
    data: SectionCreateManyDiscussionGroupInput | SectionCreateManyDiscussionGroupInput[]
    skipDuplicates?: boolean
  }

  export type CourseCreateWithoutDiscussionGroupsInput = {
    code: string
    title: string
    description: string
    sections?: SectionCreateNestedManyWithoutCourseInput
    department: DepartmentCreateNestedOneWithoutCoursesInput
  }

  export type CourseUncheckedCreateWithoutDiscussionGroupsInput = {
    id?: number
    code: string
    title: string
    description: string
    departmentId: number
    sections?: SectionUncheckedCreateNestedManyWithoutCourseInput
  }

  export type CourseCreateOrConnectWithoutDiscussionGroupsInput = {
    where: CourseWhereUniqueInput
    create: XOR<CourseCreateWithoutDiscussionGroupsInput, CourseUncheckedCreateWithoutDiscussionGroupsInput>
  }

  export type SectionUpsertWithWhereUniqueWithoutDiscussionGroupInput = {
    where: SectionWhereUniqueInput
    update: XOR<SectionUpdateWithoutDiscussionGroupInput, SectionUncheckedUpdateWithoutDiscussionGroupInput>
    create: XOR<SectionCreateWithoutDiscussionGroupInput, SectionUncheckedCreateWithoutDiscussionGroupInput>
  }

  export type SectionUpdateWithWhereUniqueWithoutDiscussionGroupInput = {
    where: SectionWhereUniqueInput
    data: XOR<SectionUpdateWithoutDiscussionGroupInput, SectionUncheckedUpdateWithoutDiscussionGroupInput>
  }

  export type SectionUpdateManyWithWhereWithoutDiscussionGroupInput = {
    where: SectionScalarWhereInput
    data: XOR<SectionUpdateManyMutationInput, SectionUncheckedUpdateManyWithoutDiscussionGroupInput>
  }

  export type CourseUpsertWithoutDiscussionGroupsInput = {
    update: XOR<CourseUpdateWithoutDiscussionGroupsInput, CourseUncheckedUpdateWithoutDiscussionGroupsInput>
    create: XOR<CourseCreateWithoutDiscussionGroupsInput, CourseUncheckedCreateWithoutDiscussionGroupsInput>
    where?: CourseWhereInput
  }

  export type CourseUpdateToOneWithWhereWithoutDiscussionGroupsInput = {
    where?: CourseWhereInput
    data: XOR<CourseUpdateWithoutDiscussionGroupsInput, CourseUncheckedUpdateWithoutDiscussionGroupsInput>
  }

  export type CourseUpdateWithoutDiscussionGroupsInput = {
    code?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    sections?: SectionUpdateManyWithoutCourseNestedInput
    department?: DepartmentUpdateOneRequiredWithoutCoursesNestedInput
  }

  export type CourseUncheckedUpdateWithoutDiscussionGroupsInput = {
    id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    departmentId?: IntFieldUpdateOperationsInput | number
    sections?: SectionUncheckedUpdateManyWithoutCourseNestedInput
  }

  export type MeetingCreateWithoutSectionInput = {
    day: $Enums.Day
    startTime: Date | string
    endTime: Date | string
    location?: string | null
  }

  export type MeetingUncheckedCreateWithoutSectionInput = {
    id?: number
    day: $Enums.Day
    startTime: Date | string
    endTime: Date | string
    location?: string | null
  }

  export type MeetingCreateOrConnectWithoutSectionInput = {
    where: MeetingWhereUniqueInput
    create: XOR<MeetingCreateWithoutSectionInput, MeetingUncheckedCreateWithoutSectionInput>
  }

  export type MeetingCreateManySectionInputEnvelope = {
    data: MeetingCreateManySectionInput | MeetingCreateManySectionInput[]
    skipDuplicates?: boolean
  }

  export type InstructorCreateWithoutSectionsInput = {
    firstName: string
    lastName: string
    title?: string | null
    email?: string | null
    phone?: string | null
    departments?: DepartmentCreateNestedManyWithoutInstructorsInput
  }

  export type InstructorUncheckedCreateWithoutSectionsInput = {
    id?: number
    firstName: string
    lastName: string
    title?: string | null
    email?: string | null
    phone?: string | null
    departments?: DepartmentUncheckedCreateNestedManyWithoutInstructorsInput
  }

  export type InstructorCreateOrConnectWithoutSectionsInput = {
    where: InstructorWhereUniqueInput
    create: XOR<InstructorCreateWithoutSectionsInput, InstructorUncheckedCreateWithoutSectionsInput>
  }

  export type CourseCreateWithoutSectionsInput = {
    code: string
    title: string
    description: string
    discussionGroups?: DiscussionGroupCreateNestedManyWithoutCourseInput
    department: DepartmentCreateNestedOneWithoutCoursesInput
  }

  export type CourseUncheckedCreateWithoutSectionsInput = {
    id?: number
    code: string
    title: string
    description: string
    departmentId: number
    discussionGroups?: DiscussionGroupUncheckedCreateNestedManyWithoutCourseInput
  }

  export type CourseCreateOrConnectWithoutSectionsInput = {
    where: CourseWhereUniqueInput
    create: XOR<CourseCreateWithoutSectionsInput, CourseUncheckedCreateWithoutSectionsInput>
  }

  export type DiscussionGroupCreateWithoutSectionsInput = {
    term: string
    course: CourseCreateNestedOneWithoutDiscussionGroupsInput
  }

  export type DiscussionGroupUncheckedCreateWithoutSectionsInput = {
    id?: number
    courseId: number
    term: string
  }

  export type DiscussionGroupCreateOrConnectWithoutSectionsInput = {
    where: DiscussionGroupWhereUniqueInput
    create: XOR<DiscussionGroupCreateWithoutSectionsInput, DiscussionGroupUncheckedCreateWithoutSectionsInput>
  }

  export type MeetingUpsertWithWhereUniqueWithoutSectionInput = {
    where: MeetingWhereUniqueInput
    update: XOR<MeetingUpdateWithoutSectionInput, MeetingUncheckedUpdateWithoutSectionInput>
    create: XOR<MeetingCreateWithoutSectionInput, MeetingUncheckedCreateWithoutSectionInput>
  }

  export type MeetingUpdateWithWhereUniqueWithoutSectionInput = {
    where: MeetingWhereUniqueInput
    data: XOR<MeetingUpdateWithoutSectionInput, MeetingUncheckedUpdateWithoutSectionInput>
  }

  export type MeetingUpdateManyWithWhereWithoutSectionInput = {
    where: MeetingScalarWhereInput
    data: XOR<MeetingUpdateManyMutationInput, MeetingUncheckedUpdateManyWithoutSectionInput>
  }

  export type MeetingScalarWhereInput = {
    AND?: MeetingScalarWhereInput | MeetingScalarWhereInput[]
    OR?: MeetingScalarWhereInput[]
    NOT?: MeetingScalarWhereInput | MeetingScalarWhereInput[]
    id?: IntFilter<"Meeting"> | number
    day?: EnumDayFilter<"Meeting"> | $Enums.Day
    startTime?: DateTimeFilter<"Meeting"> | Date | string
    endTime?: DateTimeFilter<"Meeting"> | Date | string
    location?: StringNullableFilter<"Meeting"> | string | null
    sectionId?: IntFilter<"Meeting"> | number
  }

  export type InstructorUpsertWithWhereUniqueWithoutSectionsInput = {
    where: InstructorWhereUniqueInput
    update: XOR<InstructorUpdateWithoutSectionsInput, InstructorUncheckedUpdateWithoutSectionsInput>
    create: XOR<InstructorCreateWithoutSectionsInput, InstructorUncheckedCreateWithoutSectionsInput>
  }

  export type InstructorUpdateWithWhereUniqueWithoutSectionsInput = {
    where: InstructorWhereUniqueInput
    data: XOR<InstructorUpdateWithoutSectionsInput, InstructorUncheckedUpdateWithoutSectionsInput>
  }

  export type InstructorUpdateManyWithWhereWithoutSectionsInput = {
    where: InstructorScalarWhereInput
    data: XOR<InstructorUpdateManyMutationInput, InstructorUncheckedUpdateManyWithoutSectionsInput>
  }

  export type CourseUpsertWithoutSectionsInput = {
    update: XOR<CourseUpdateWithoutSectionsInput, CourseUncheckedUpdateWithoutSectionsInput>
    create: XOR<CourseCreateWithoutSectionsInput, CourseUncheckedCreateWithoutSectionsInput>
    where?: CourseWhereInput
  }

  export type CourseUpdateToOneWithWhereWithoutSectionsInput = {
    where?: CourseWhereInput
    data: XOR<CourseUpdateWithoutSectionsInput, CourseUncheckedUpdateWithoutSectionsInput>
  }

  export type CourseUpdateWithoutSectionsInput = {
    code?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    discussionGroups?: DiscussionGroupUpdateManyWithoutCourseNestedInput
    department?: DepartmentUpdateOneRequiredWithoutCoursesNestedInput
  }

  export type CourseUncheckedUpdateWithoutSectionsInput = {
    id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    departmentId?: IntFieldUpdateOperationsInput | number
    discussionGroups?: DiscussionGroupUncheckedUpdateManyWithoutCourseNestedInput
  }

  export type DiscussionGroupUpsertWithoutSectionsInput = {
    update: XOR<DiscussionGroupUpdateWithoutSectionsInput, DiscussionGroupUncheckedUpdateWithoutSectionsInput>
    create: XOR<DiscussionGroupCreateWithoutSectionsInput, DiscussionGroupUncheckedCreateWithoutSectionsInput>
    where?: DiscussionGroupWhereInput
  }

  export type DiscussionGroupUpdateToOneWithWhereWithoutSectionsInput = {
    where?: DiscussionGroupWhereInput
    data: XOR<DiscussionGroupUpdateWithoutSectionsInput, DiscussionGroupUncheckedUpdateWithoutSectionsInput>
  }

  export type DiscussionGroupUpdateWithoutSectionsInput = {
    term?: StringFieldUpdateOperationsInput | string
    course?: CourseUpdateOneRequiredWithoutDiscussionGroupsNestedInput
  }

  export type DiscussionGroupUncheckedUpdateWithoutSectionsInput = {
    id?: IntFieldUpdateOperationsInput | number
    courseId?: IntFieldUpdateOperationsInput | number
    term?: StringFieldUpdateOperationsInput | string
  }

  export type SectionCreateWithoutMeetingsInput = {
    sectionNumber: string
    classNumber: string
    term: string
    isAsync?: boolean
    type?: string
    instructors?: InstructorCreateNestedManyWithoutSectionsInput
    course: CourseCreateNestedOneWithoutSectionsInput
    discussionGroup?: DiscussionGroupCreateNestedOneWithoutSectionsInput
  }

  export type SectionUncheckedCreateWithoutMeetingsInput = {
    id?: number
    sectionNumber: string
    classNumber: string
    term: string
    isAsync?: boolean
    courseId: number
    discussionGroupId?: number | null
    type?: string
    instructors?: InstructorUncheckedCreateNestedManyWithoutSectionsInput
  }

  export type SectionCreateOrConnectWithoutMeetingsInput = {
    where: SectionWhereUniqueInput
    create: XOR<SectionCreateWithoutMeetingsInput, SectionUncheckedCreateWithoutMeetingsInput>
  }

  export type SectionUpsertWithoutMeetingsInput = {
    update: XOR<SectionUpdateWithoutMeetingsInput, SectionUncheckedUpdateWithoutMeetingsInput>
    create: XOR<SectionCreateWithoutMeetingsInput, SectionUncheckedCreateWithoutMeetingsInput>
    where?: SectionWhereInput
  }

  export type SectionUpdateToOneWithWhereWithoutMeetingsInput = {
    where?: SectionWhereInput
    data: XOR<SectionUpdateWithoutMeetingsInput, SectionUncheckedUpdateWithoutMeetingsInput>
  }

  export type SectionUpdateWithoutMeetingsInput = {
    sectionNumber?: StringFieldUpdateOperationsInput | string
    classNumber?: StringFieldUpdateOperationsInput | string
    term?: StringFieldUpdateOperationsInput | string
    isAsync?: BoolFieldUpdateOperationsInput | boolean
    type?: StringFieldUpdateOperationsInput | string
    instructors?: InstructorUpdateManyWithoutSectionsNestedInput
    course?: CourseUpdateOneRequiredWithoutSectionsNestedInput
    discussionGroup?: DiscussionGroupUpdateOneWithoutSectionsNestedInput
  }

  export type SectionUncheckedUpdateWithoutMeetingsInput = {
    id?: IntFieldUpdateOperationsInput | number
    sectionNumber?: StringFieldUpdateOperationsInput | string
    classNumber?: StringFieldUpdateOperationsInput | string
    term?: StringFieldUpdateOperationsInput | string
    isAsync?: BoolFieldUpdateOperationsInput | boolean
    courseId?: IntFieldUpdateOperationsInput | number
    discussionGroupId?: NullableIntFieldUpdateOperationsInput | number | null
    type?: StringFieldUpdateOperationsInput | string
    instructors?: InstructorUncheckedUpdateManyWithoutSectionsNestedInput
  }

  export type SectionCreateWithoutInstructorsInput = {
    sectionNumber: string
    classNumber: string
    term: string
    isAsync?: boolean
    type?: string
    meetings?: MeetingCreateNestedManyWithoutSectionInput
    course: CourseCreateNestedOneWithoutSectionsInput
    discussionGroup?: DiscussionGroupCreateNestedOneWithoutSectionsInput
  }

  export type SectionUncheckedCreateWithoutInstructorsInput = {
    id?: number
    sectionNumber: string
    classNumber: string
    term: string
    isAsync?: boolean
    courseId: number
    discussionGroupId?: number | null
    type?: string
    meetings?: MeetingUncheckedCreateNestedManyWithoutSectionInput
  }

  export type SectionCreateOrConnectWithoutInstructorsInput = {
    where: SectionWhereUniqueInput
    create: XOR<SectionCreateWithoutInstructorsInput, SectionUncheckedCreateWithoutInstructorsInput>
  }

  export type DepartmentCreateWithoutInstructorsInput = {
    code: string
    title: string
    courses?: CourseCreateNestedManyWithoutDepartmentInput
  }

  export type DepartmentUncheckedCreateWithoutInstructorsInput = {
    id?: number
    code: string
    title: string
    courses?: CourseUncheckedCreateNestedManyWithoutDepartmentInput
  }

  export type DepartmentCreateOrConnectWithoutInstructorsInput = {
    where: DepartmentWhereUniqueInput
    create: XOR<DepartmentCreateWithoutInstructorsInput, DepartmentUncheckedCreateWithoutInstructorsInput>
  }

  export type SectionUpsertWithWhereUniqueWithoutInstructorsInput = {
    where: SectionWhereUniqueInput
    update: XOR<SectionUpdateWithoutInstructorsInput, SectionUncheckedUpdateWithoutInstructorsInput>
    create: XOR<SectionCreateWithoutInstructorsInput, SectionUncheckedCreateWithoutInstructorsInput>
  }

  export type SectionUpdateWithWhereUniqueWithoutInstructorsInput = {
    where: SectionWhereUniqueInput
    data: XOR<SectionUpdateWithoutInstructorsInput, SectionUncheckedUpdateWithoutInstructorsInput>
  }

  export type SectionUpdateManyWithWhereWithoutInstructorsInput = {
    where: SectionScalarWhereInput
    data: XOR<SectionUpdateManyMutationInput, SectionUncheckedUpdateManyWithoutInstructorsInput>
  }

  export type DepartmentUpsertWithWhereUniqueWithoutInstructorsInput = {
    where: DepartmentWhereUniqueInput
    update: XOR<DepartmentUpdateWithoutInstructorsInput, DepartmentUncheckedUpdateWithoutInstructorsInput>
    create: XOR<DepartmentCreateWithoutInstructorsInput, DepartmentUncheckedCreateWithoutInstructorsInput>
  }

  export type DepartmentUpdateWithWhereUniqueWithoutInstructorsInput = {
    where: DepartmentWhereUniqueInput
    data: XOR<DepartmentUpdateWithoutInstructorsInput, DepartmentUncheckedUpdateWithoutInstructorsInput>
  }

  export type DepartmentUpdateManyWithWhereWithoutInstructorsInput = {
    where: DepartmentScalarWhereInput
    data: XOR<DepartmentUpdateManyMutationInput, DepartmentUncheckedUpdateManyWithoutInstructorsInput>
  }

  export type DepartmentScalarWhereInput = {
    AND?: DepartmentScalarWhereInput | DepartmentScalarWhereInput[]
    OR?: DepartmentScalarWhereInput[]
    NOT?: DepartmentScalarWhereInput | DepartmentScalarWhereInput[]
    id?: IntFilter<"Department"> | number
    code?: StringFilter<"Department"> | string
    title?: StringFilter<"Department"> | string
  }

  export type CourseCreateManyDepartmentInput = {
    id?: number
    code: string
    title: string
    description: string
  }

  export type CourseUpdateWithoutDepartmentInput = {
    code?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    sections?: SectionUpdateManyWithoutCourseNestedInput
    discussionGroups?: DiscussionGroupUpdateManyWithoutCourseNestedInput
  }

  export type CourseUncheckedUpdateWithoutDepartmentInput = {
    id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    sections?: SectionUncheckedUpdateManyWithoutCourseNestedInput
    discussionGroups?: DiscussionGroupUncheckedUpdateManyWithoutCourseNestedInput
  }

  export type CourseUncheckedUpdateManyWithoutDepartmentInput = {
    id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
  }

  export type InstructorUpdateWithoutDepartmentsInput = {
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    sections?: SectionUpdateManyWithoutInstructorsNestedInput
  }

  export type InstructorUncheckedUpdateWithoutDepartmentsInput = {
    id?: IntFieldUpdateOperationsInput | number
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    sections?: SectionUncheckedUpdateManyWithoutInstructorsNestedInput
  }

  export type InstructorUncheckedUpdateManyWithoutDepartmentsInput = {
    id?: IntFieldUpdateOperationsInput | number
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SectionCreateManyCourseInput = {
    id?: number
    sectionNumber: string
    classNumber: string
    term: string
    isAsync?: boolean
    discussionGroupId?: number | null
    type?: string
  }

  export type DiscussionGroupCreateManyCourseInput = {
    id?: number
    term: string
  }

  export type SectionUpdateWithoutCourseInput = {
    sectionNumber?: StringFieldUpdateOperationsInput | string
    classNumber?: StringFieldUpdateOperationsInput | string
    term?: StringFieldUpdateOperationsInput | string
    isAsync?: BoolFieldUpdateOperationsInput | boolean
    type?: StringFieldUpdateOperationsInput | string
    meetings?: MeetingUpdateManyWithoutSectionNestedInput
    instructors?: InstructorUpdateManyWithoutSectionsNestedInput
    discussionGroup?: DiscussionGroupUpdateOneWithoutSectionsNestedInput
  }

  export type SectionUncheckedUpdateWithoutCourseInput = {
    id?: IntFieldUpdateOperationsInput | number
    sectionNumber?: StringFieldUpdateOperationsInput | string
    classNumber?: StringFieldUpdateOperationsInput | string
    term?: StringFieldUpdateOperationsInput | string
    isAsync?: BoolFieldUpdateOperationsInput | boolean
    discussionGroupId?: NullableIntFieldUpdateOperationsInput | number | null
    type?: StringFieldUpdateOperationsInput | string
    meetings?: MeetingUncheckedUpdateManyWithoutSectionNestedInput
    instructors?: InstructorUncheckedUpdateManyWithoutSectionsNestedInput
  }

  export type SectionUncheckedUpdateManyWithoutCourseInput = {
    id?: IntFieldUpdateOperationsInput | number
    sectionNumber?: StringFieldUpdateOperationsInput | string
    classNumber?: StringFieldUpdateOperationsInput | string
    term?: StringFieldUpdateOperationsInput | string
    isAsync?: BoolFieldUpdateOperationsInput | boolean
    discussionGroupId?: NullableIntFieldUpdateOperationsInput | number | null
    type?: StringFieldUpdateOperationsInput | string
  }

  export type DiscussionGroupUpdateWithoutCourseInput = {
    term?: StringFieldUpdateOperationsInput | string
    sections?: SectionUpdateManyWithoutDiscussionGroupNestedInput
  }

  export type DiscussionGroupUncheckedUpdateWithoutCourseInput = {
    id?: IntFieldUpdateOperationsInput | number
    term?: StringFieldUpdateOperationsInput | string
    sections?: SectionUncheckedUpdateManyWithoutDiscussionGroupNestedInput
  }

  export type DiscussionGroupUncheckedUpdateManyWithoutCourseInput = {
    id?: IntFieldUpdateOperationsInput | number
    term?: StringFieldUpdateOperationsInput | string
  }

  export type SectionCreateManyDiscussionGroupInput = {
    id?: number
    sectionNumber: string
    classNumber: string
    term: string
    isAsync?: boolean
    courseId: number
    type?: string
  }

  export type SectionUpdateWithoutDiscussionGroupInput = {
    sectionNumber?: StringFieldUpdateOperationsInput | string
    classNumber?: StringFieldUpdateOperationsInput | string
    term?: StringFieldUpdateOperationsInput | string
    isAsync?: BoolFieldUpdateOperationsInput | boolean
    type?: StringFieldUpdateOperationsInput | string
    meetings?: MeetingUpdateManyWithoutSectionNestedInput
    instructors?: InstructorUpdateManyWithoutSectionsNestedInput
    course?: CourseUpdateOneRequiredWithoutSectionsNestedInput
  }

  export type SectionUncheckedUpdateWithoutDiscussionGroupInput = {
    id?: IntFieldUpdateOperationsInput | number
    sectionNumber?: StringFieldUpdateOperationsInput | string
    classNumber?: StringFieldUpdateOperationsInput | string
    term?: StringFieldUpdateOperationsInput | string
    isAsync?: BoolFieldUpdateOperationsInput | boolean
    courseId?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    meetings?: MeetingUncheckedUpdateManyWithoutSectionNestedInput
    instructors?: InstructorUncheckedUpdateManyWithoutSectionsNestedInput
  }

  export type SectionUncheckedUpdateManyWithoutDiscussionGroupInput = {
    id?: IntFieldUpdateOperationsInput | number
    sectionNumber?: StringFieldUpdateOperationsInput | string
    classNumber?: StringFieldUpdateOperationsInput | string
    term?: StringFieldUpdateOperationsInput | string
    isAsync?: BoolFieldUpdateOperationsInput | boolean
    courseId?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
  }

  export type MeetingCreateManySectionInput = {
    id?: number
    day: $Enums.Day
    startTime: Date | string
    endTime: Date | string
    location?: string | null
  }

  export type MeetingUpdateWithoutSectionInput = {
    day?: EnumDayFieldUpdateOperationsInput | $Enums.Day
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MeetingUncheckedUpdateWithoutSectionInput = {
    id?: IntFieldUpdateOperationsInput | number
    day?: EnumDayFieldUpdateOperationsInput | $Enums.Day
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MeetingUncheckedUpdateManyWithoutSectionInput = {
    id?: IntFieldUpdateOperationsInput | number
    day?: EnumDayFieldUpdateOperationsInput | $Enums.Day
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type InstructorUpdateWithoutSectionsInput = {
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    departments?: DepartmentUpdateManyWithoutInstructorsNestedInput
  }

  export type InstructorUncheckedUpdateWithoutSectionsInput = {
    id?: IntFieldUpdateOperationsInput | number
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    departments?: DepartmentUncheckedUpdateManyWithoutInstructorsNestedInput
  }

  export type InstructorUncheckedUpdateManyWithoutSectionsInput = {
    id?: IntFieldUpdateOperationsInput | number
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SectionUpdateWithoutInstructorsInput = {
    sectionNumber?: StringFieldUpdateOperationsInput | string
    classNumber?: StringFieldUpdateOperationsInput | string
    term?: StringFieldUpdateOperationsInput | string
    isAsync?: BoolFieldUpdateOperationsInput | boolean
    type?: StringFieldUpdateOperationsInput | string
    meetings?: MeetingUpdateManyWithoutSectionNestedInput
    course?: CourseUpdateOneRequiredWithoutSectionsNestedInput
    discussionGroup?: DiscussionGroupUpdateOneWithoutSectionsNestedInput
  }

  export type SectionUncheckedUpdateWithoutInstructorsInput = {
    id?: IntFieldUpdateOperationsInput | number
    sectionNumber?: StringFieldUpdateOperationsInput | string
    classNumber?: StringFieldUpdateOperationsInput | string
    term?: StringFieldUpdateOperationsInput | string
    isAsync?: BoolFieldUpdateOperationsInput | boolean
    courseId?: IntFieldUpdateOperationsInput | number
    discussionGroupId?: NullableIntFieldUpdateOperationsInput | number | null
    type?: StringFieldUpdateOperationsInput | string
    meetings?: MeetingUncheckedUpdateManyWithoutSectionNestedInput
  }

  export type SectionUncheckedUpdateManyWithoutInstructorsInput = {
    id?: IntFieldUpdateOperationsInput | number
    sectionNumber?: StringFieldUpdateOperationsInput | string
    classNumber?: StringFieldUpdateOperationsInput | string
    term?: StringFieldUpdateOperationsInput | string
    isAsync?: BoolFieldUpdateOperationsInput | boolean
    courseId?: IntFieldUpdateOperationsInput | number
    discussionGroupId?: NullableIntFieldUpdateOperationsInput | number | null
    type?: StringFieldUpdateOperationsInput | string
  }

  export type DepartmentUpdateWithoutInstructorsInput = {
    code?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    courses?: CourseUpdateManyWithoutDepartmentNestedInput
  }

  export type DepartmentUncheckedUpdateWithoutInstructorsInput = {
    id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    courses?: CourseUncheckedUpdateManyWithoutDepartmentNestedInput
  }

  export type DepartmentUncheckedUpdateManyWithoutInstructorsInput = {
    id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}