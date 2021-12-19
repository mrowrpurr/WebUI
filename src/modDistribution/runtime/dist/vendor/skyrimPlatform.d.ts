export declare class PapyrusObject {
    static from(papyrusObject: PapyrusObject | null): PapyrusObject | null;
}
export declare type PapyrusValue = PapyrusObject | number | string | boolean | null | PapyrusValue[];
export declare function printConsole(...arguments: unknown[]): void;
export declare function writeLogs(pluginName: string, ...arguments: unknown[]): void;
export declare function setPrintConsolePrefixesEnabled(enabled: boolean): void;
export declare function writeScript(scriptName: string, src: string): void;
export declare function callNative(className: string, functionName: string, self?: PapyrusObject, ...args: PapyrusValue[]): PapyrusValue;
export declare function getJsMemoryUsage(): number;
export declare function getPluginSourceCode(pluginName: string): string;
export declare function writePlugin(pluginName: string, newSources: string): string;
export declare function getPlatformVersion(): string;
export declare function disableCtrlPrtScnHotkey(): void;
export declare function sendIpcMessage(targetSystemName: string, message: ArrayBuffer): void;
export declare function encodeUtf8(text: string): ArrayBuffer;
export declare function decodeUtf8(buffer: ArrayBuffer): string;
export declare let storage: Record<string, unknown>;
export declare let settings: Record<string, Record<string, unknown>>;
export declare function on(eventName: 'update', callback: () => void): void;
export declare function once(eventName: 'update', callback: () => void): void;
export declare function on(eventName: 'tick', callback: () => void): void;
export declare function once(eventName: 'tick', callback: () => void): void;
export interface IpcMessageEvent {
    sourceSystemName: string;
    message: ArrayBuffer;
}
export declare function on(eventName: 'ipcMessage', callback: (event: IpcMessageEvent) => void): void;
export declare function once(eventName: 'ipcMessage', callback: (event: IpcMessageEvent) => void): void;
export interface Face {
    hairColor: number;
    bodySkinColor: number;
    headTextureSetId: number;
    headPartIds: number[];
    presets: number[];
}
export interface ChangeFormNpc {
    raceId?: number;
    name?: string;
    face?: Face;
}
export declare function loadGame(pos: number[], angle: number[], worldOrCell: number, changeFormNpc?: ChangeFormNpc): void;
export declare function worldPointToScreenPoint(...args: number[][]): number[][];
export declare type PacketType = 'message' | 'disconnect' | 'connectionAccepted' | 'connectionFailed' | 'connectionDenied';
interface MpClientPlugin {
    getVersion(): string;
    createClient(host: string, port: number): void;
    destroyClient(): void;
    isConnected(): boolean;
    tick(tickHandler: (packetType: PacketType, jsonContent: string, error: string) => void): void;
    send(jsonContent: string, reliable: boolean): void;
}
export declare let mpClientPlugin: MpClientPlugin;
export interface Browser {
    setVisible(visible: boolean): void;
    isVisible(): boolean;
    setFocused(focused: boolean): void;
    isFocused(): boolean;
    loadUrl(url: string): void;
    getToken(): string;
    executeJavaScript(src: string): void;
}
export declare let browser: Browser;
export interface ExtraData {
    type: 'Health' | 'Count' | 'Enchantment' | 'Charge' | 'TextDisplayData' | 'Soul' | 'Poison' | 'Worn' | 'WornLeft';
}
export interface ExtraHealth extends ExtraData {
    type: 'Health';
    health: number;
}
export interface ExtraCount extends ExtraData {
    type: 'Count';
    count: number;
}
export interface ExtraEnchantment extends ExtraData {
    type: 'Enchantment';
    enchantmentId: number;
    maxCharge: number;
    removeOnUnequip: boolean;
}
export interface ExtraCharge extends ExtraData {
    type: 'Charge';
    charge: number;
}
export interface ExtraTextDisplayData extends ExtraData {
    type: 'TextDisplayData';
    name: string;
}
export interface ExtraSoul extends ExtraData {
    type: 'Soul';
    soul: 0 | 1 | 2 | 3 | 4 | 5;
}
export interface ExtraPoison extends ExtraData {
    type: 'Poison';
    poisonId: number;
    count: number;
}
export interface ExtraWorn extends ExtraData {
    type: 'Worn';
}
export interface ExtraWornLeft extends ExtraData {
    type: 'WornLeft';
}
export declare type BaseExtraList = ExtraData[];
export interface InventoryChangesEntry {
    countDelta: number;
    baseId: number;
    extendDataList: BaseExtraList[];
}
export declare let getExtraContainerChanges: (objectReferenceId: number) => InventoryChangesEntry[];
export interface InventoryEntry {
    count: number;
    baseId: number;
}
export declare let getContainer: (baseId: number) => InventoryEntry[];
export interface ActivateEvent {
    target: ObjectReference;
    caster: ObjectReference;
    isCrimeToActivate: boolean;
}
export interface MoveAttachDetachEvent {
    movedRef: ObjectReference;
    isCellAttached: boolean;
}
export interface WaitStopEvent {
    isInterrupted: boolean;
}
export interface ObjectLoadedEvent {
    object: Form;
    isLoaded: boolean;
}
export interface LockChangedEvent {
    lockedObject: ObjectReference;
}
export interface CellFullyLoadedEvent {
    cell: Cell;
}
export interface GrabReleaseEvent {
    refr: ObjectReference;
    isGrabbed: boolean;
}
export interface SwitchRaceCompleteEvent {
    subject: ObjectReference;
}
export interface UniqueIDChangeEvent {
    oldBaseID: number;
    newBaseID: number;
    oldUniqueID: number;
    newUniqueID: number;
}
export interface TrackedStatsEvent {
    statName: string;
    newValue: number;
}
export interface InitScriptEvent {
    initializedObject: ObjectReference;
}
export interface ResetEvent {
    object: ObjectReference;
}
export interface CombatEvent {
    target: ObjectReference;
    actor: ObjectReference;
    isCombat: boolean;
    isSearching: boolean;
}
export interface DeathEvent {
    actorDying: ObjectReference;
    actorKiller: ObjectReference;
}
export interface ContainerChangedEvent {
    oldContainer: ObjectReference;
    newContainer: ObjectReference;
    baseObj: Form;
    numItems: number;
    uniqueID: number;
    reference: ObjectReference;
}
export interface HitEvent {
    target: ObjectReference;
    aggressor: ObjectReference;
    source: Form;
    projectile: Projectile;
    isPowerAttack: boolean;
    isSneakAttack: boolean;
    isBashAttack: boolean;
    isHitBlocked: boolean;
}
export interface EquipEvent {
    actor: ObjectReference;
    baseObj: Form;
    uniqueId: number;
    originalRefr: ObjectReference;
}
export interface ActiveEffectApplyRemoveEvent {
    activeEffect: ActiveMagicEffect;
    effect: MagicEffect;
    caster: ObjectReference;
    target: ObjectReference;
}
export interface MenuOpenEvent {
    name: string;
}
export interface MenuCloseEvent {
    name: string;
}
export interface MagicEffectApplyEvent {
    activeEffect: ActiveMagicEffect;
    effect: MagicEffect;
    caster: ObjectReference;
    target: ObjectReference;
}
export interface BrowserMessageEvent {
    arguments: unknown[];
}
export interface ConsoleMessageEvent {
    message: string;
}
export declare function on(eventName: 'activate', callback: (event: ActivateEvent) => void): void;
export declare function once(eventName: 'activate', callback: (event: ActivateEvent) => void): void;
export declare function on(eventName: 'waitStop', callback: (event: WaitStopEvent) => void): void;
export declare function once(eventName: 'waitStop', callback: (event: WaitStopEvent) => void): void;
export declare function on(eventName: 'objectLoaded', callback: (event: ObjectLoadedEvent) => void): void;
export declare function once(eventName: 'objectLoaded', callback: (event: ObjectLoadedEvent) => void): void;
export declare function on(eventName: 'moveAttachDetach', callback: (event: MoveAttachDetachEvent) => void): void;
export declare function once(eventName: 'moveAttachDetach', callback: (event: MoveAttachDetachEvent) => void): void;
export declare function on(eventName: 'lockChanged', callback: (event: LockChangedEvent) => void): void;
export declare function once(eventName: 'lockChanged', callback: (event: LockChangedEvent) => void): void;
export declare function on(eventName: 'grabRelease', callback: (event: GrabReleaseEvent) => void): void;
export declare function once(eventName: 'grabRelease', callback: (event: GrabReleaseEvent) => void): void;
export declare function on(eventName: 'cellFullyLoaded', callback: (event: CellFullyLoadedEvent) => void): void;
export declare function once(eventName: 'cellFullyLoaded', callback: (event: CellFullyLoadedEvent) => void): void;
export declare function on(eventName: 'switchRaceComplete', callback: (event: SwitchRaceCompleteEvent) => void): void;
export declare function once(eventName: 'switchRaceComplete', callback: (event: SwitchRaceCompleteEvent) => void): void;
export declare function on(eventName: 'uniqueIdChange', callback: (event: UniqueIDChangeEvent) => void): void;
export declare function once(eventName: 'uniqueIdChange', callback: (event: UniqueIDChangeEvent) => void): void;
export declare function on(eventName: 'trackedStats', callback: (event: TrackedStatsEvent) => void): void;
export declare function once(eventName: 'trackedStats', callback: (event: TrackedStatsEvent) => void): void;
export declare function on(eventName: 'scriptInit', callback: (event: InitScriptEvent) => void): void;
export declare function once(eventName: 'scriptInit', callback: (event: InitScriptEvent) => void): void;
export declare function on(eventName: 'reset', callback: (event: ResetEvent) => void): void;
export declare function once(eventName: 'reset', callback: (event: ResetEvent) => void): void;
export declare function on(eventName: 'combatState', callback: (event: CombatEvent) => void): void;
export declare function once(eventName: 'combatState', callback: (event: CombatEvent) => void): void;
export declare function on(eventName: 'loadGame', callback: () => void): void;
export declare function once(eventName: 'loadGame', callback: () => void): void;
export declare function on(eventName: 'deathEnd', callback: (event: DeathEvent) => void): void;
export declare function once(eventName: 'deathEnd', callback: (event: DeathEvent) => void): void;
export declare function on(eventName: 'deathStart', callback: (event: DeathEvent) => void): void;
export declare function once(eventName: 'deathStart', callback: (event: DeathEvent) => void): void;
export declare function on(eventName: 'containerChanged', callback: (event: ContainerChangedEvent) => void): void;
export declare function once(eventName: 'containerChanged', callback: (event: ContainerChangedEvent) => void): void;
export declare function on(eventName: 'hit', callback: (event: HitEvent) => void): void;
export declare function once(eventName: 'hit', callback: (event: HitEvent) => void): void;
export declare function on(eventName: 'unequip', callback: (event: EquipEvent) => void): void;
export declare function once(eventName: 'unequip', callback: (event: EquipEvent) => void): void;
export declare function on(eventName: 'equip', callback: (event: EquipEvent) => void): void;
export declare function once(eventName: 'equip', callback: (event: EquipEvent) => void): void;
export declare function on(eventName: 'magicEffectApply', callback: (event: MagicEffectApplyEvent) => void): void;
export declare function once(eventName: 'magicEffectApply', callback: (event: MagicEffectApplyEvent) => void): void;
export declare function on(eventName: 'effectFinish', callback: (event: ActiveEffectApplyRemoveEvent) => void): void;
export declare function once(eventName: 'effectFinish', callback: (event: ActiveEffectApplyRemoveEvent) => void): void;
export declare function on(eventName: 'effectStart', callback: (event: ActiveEffectApplyRemoveEvent) => void): void;
export declare function once(eventName: 'effectStart', callback: (event: ActiveEffectApplyRemoveEvent) => void): void;
export declare function on(eventName: 'menuOpen', callback: (event: MenuOpenEvent) => void): void;
export declare function once(eventName: 'menuOpen', callback: (event: MenuOpenEvent) => void): void;
export declare function on(eventName: 'menuClose', callback: (event: MenuCloseEvent) => void): void;
export declare function once(eventName: 'menuClose', callback: (event: MenuCloseEvent) => void): void;
export declare function on(eventName: 'browserMessage', callback: (event: BrowserMessageEvent) => void): void;
export declare function once(eventName: 'browserMessage', callback: (event: BrowserMessageEvent) => void): void;
export declare function on(eventName: 'consoleMessage', callback: (event: ConsoleMessageEvent) => void): void;
export declare function once(eventName: 'consoleMessage', callback: (event: ConsoleMessageEvent) => void): void;
declare class ConsoleComand {
    longName: string;
    shortName: string;
    numArgs: number;
    execute: (...arguments: unknown[]) => boolean;
}
export declare function findConsoleCommand(cmdName: string): ConsoleComand;
export declare const enum MotionType {
    Dynamic = 1,
    SphereInertia = 2,
    BoxInertia = 3,
    Keyframed = 4,
    Fixed = 5,
    ThinBoxInertia = 6,
    Character = 7
}
export declare const enum Menu {
    Barter = "BarterMenu",
    Book = "Book Menu",
    Console = "Console",
    ConsoleNativeUI = "Console Native UI Menu",
    Container = "ContainerMenu",
    Crafting = "Crafting Menu",
    Credits = "Credits Menu",
    Cursor = "Cursor Menu",
    Debug = "Debug Text Menu",
    Dialogue = "Dialogue Menu",
    Fader = "Fader Menu",
    Favorites = "FavoritesMenu",
    Gift = "GiftMenu",
    HUD = "HUD Menu",
    Inventory = "InventoryMenu",
    Journal = "Journal Menu",
    Kinect = "Kinect Menu",
    LevelUp = "LevelUp Menu",
    Loading = "Loading Menu",
    Main = "Main Menu",
    Lockpicking = "Lockpicking Menu",
    Magic = "MagicMenu",
    Map = "MapMenu",
    MessageBox = "MessageBoxMenu",
    Mist = "Mist Menu",
    OverlayInteraction = "Overlay Interaction Menu",
    Overlay = "Overlay Menu",
    Quantity = "Quantity Menu",
    RaceSex = "RaceSex Menu",
    Sleep = "Sleep/Wait Menu",
    Stats = "StatsMenu",
    TitleSequence = "TitleSequence Menu",
    Top = "Top Menu",
    Training = "Training Menu",
    Tutorial = "Tutorial Menu",
    Tween = "TweenMenu"
}
export declare const enum DxScanCode {
    None = 0,
    Escape = 1,
    N1 = 2,
    N2 = 3,
    N3 = 4,
    N4 = 5,
    N5 = 6,
    N6 = 7,
    N7 = 8,
    N8 = 9,
    N9 = 10,
    N0 = 11,
    Minus = 12,
    Equals = 13,
    Backspace = 14,
    Tab = 15,
    Q = 16,
    W = 17,
    E = 18,
    R = 19,
    T = 20,
    Y = 21,
    U = 22,
    I = 23,
    O = 24,
    P = 25,
    LeftBracket = 26,
    RightBracket = 27,
    Enter = 28,
    LeftControl = 29,
    A = 30,
    S = 31,
    D = 32,
    F = 33,
    G = 34,
    H = 35,
    J = 36,
    K = 37,
    L = 38,
    Semicolon = 39,
    Apostrophe = 40,
    Console = 41,
    LeftShift = 42,
    BackSlash = 43,
    Z = 44,
    X = 45,
    C = 46,
    V = 47,
    B = 48,
    N = 49,
    M = 50,
    Comma = 51,
    Period = 52,
    ForwardSlash = 53,
    RightShift = 54,
    NumMult = 55,
    LeftAlt = 56,
    Spacebar = 57,
    CapsLock = 58,
    F1 = 59,
    F2 = 60,
    F3 = 61,
    F4 = 62,
    F5 = 63,
    F6 = 64,
    F7 = 65,
    F8 = 66,
    F9 = 67,
    F10 = 68,
    NumLock = 69,
    ScrollLock = 70,
    Num7 = 71,
    Num8 = 72,
    Num9 = 73,
    NumMinus = 74,
    Num4 = 75,
    Num5 = 76,
    Num6 = 77,
    NumPlus = 78,
    Num1 = 79,
    Num2 = 80,
    Num3 = 81,
    Num0 = 82,
    NumDot = 83,
    F11 = 87,
    F12 = 88,
    NumEnter = 156,
    RightControl = 157,
    NumSlash = 181,
    SysRqPtrScr = 183,
    RightAlt = 184,
    Pause = 197,
    Home = 199,
    UpArrow = 200,
    PgUp = 201,
    LeftArrow = 203,
    RightArrow = 205,
    End = 207,
    DownArrow = 208,
    PgDown = 209,
    Insert = 210,
    Delete = 211,
    LeftMouseButton = 256,
    RightMouseButton = 257,
    MiddleMouseButton = 258,
    MouseButton3 = 259,
    MouseButton4 = 260,
    MouseButton5 = 261,
    MouseButton6 = 262,
    MouseButton7 = 263,
    MouseWheelUp = 264,
    MouseWheelDown = 265
}
export declare const enum FormType {
    ANIO = 83,
    ARMA = 102,
    AcousticSpace = 16,
    Action = 6,
    Activator = 24,
    ActorValueInfo = 95,
    AddonNode = 94,
    Ammo = 42,
    Apparatus = 33,
    Armor = 26,
    ArrowProjectile = 64,
    Art = 125,
    AssociationType = 123,
    BarrierProjectile = 69,
    BeamProjectile = 66,
    BodyPartData = 93,
    Book = 27,
    CameraPath = 97,
    CameraShot = 96,
    Cell = 60,
    Character = 62,
    Class = 10,
    Climate = 55,
    CollisionLayer = 132,
    ColorForm = 133,
    CombatStyle = 80,
    ConeProjectile = 68,
    ConstructibleObject = 49,
    Container = 28,
    DLVW = 117,
    Debris = 88,
    DefaultObject = 107,
    DialogueBranch = 115,
    Door = 29,
    DualCastData = 129,
    EffectSetting = 18,
    EffectShader = 85,
    Enchantment = 21,
    EncounterZone = 103,
    EquipSlot = 120,
    Explosion = 87,
    Eyes = 13,
    Faction = 11,
    FlameProjectile = 67,
    Flora = 39,
    Footstep = 110,
    FootstepSet = 111,
    Furniture = 40,
    GMST = 3,
    Global = 9,
    Grass = 37,
    GrenadeProjectile = 65,
    Group = 2,
    Hazard = 51,
    HeadPart = 12,
    Idle = 78,
    IdleMarker = 47,
    ImageSpace = 89,
    ImageSpaceModifier = 90,
    ImpactData = 100,
    ImpactDataSet = 101,
    Ingredient = 30,
    Key = 45,
    Keyword = 4,
    Land = 72,
    LandTexture = 20,
    LeveledCharacter = 44,
    LeveledItem = 53,
    LeveledSpell = 82,
    Light = 31,
    LightingTemplate = 108,
    List = 91,
    LoadScreen = 81,
    Location = 104,
    LocationRef = 5,
    Material = 126,
    MaterialType = 99,
    MenuIcon = 8,
    Message = 105,
    Misc = 32,
    MissileProjectile = 63,
    MovableStatic = 36,
    MovementType = 127,
    MusicTrack = 116,
    MusicType = 109,
    NAVI = 59,
    NPC = 43,
    NavMesh = 73,
    None = 0,
    Note = 48,
    Outfit = 124,
    PHZD = 70,
    Package = 79,
    Perk = 92,
    Potion = 46,
    Projectile = 50,
    Quest = 77,
    Race = 14,
    Ragdoll = 106,
    Reference = 61,
    ReferenceEffect = 57,
    Region = 58,
    Relationship = 121,
    ReverbParam = 134,
    Scene = 122,
    Script = 19,
    ScrollItem = 23,
    ShaderParticleGeometryData = 56,
    Shout = 119,
    Skill = 17,
    SoulGem = 52,
    Sound = 15,
    SoundCategory = 130,
    SoundDescriptor = 128,
    SoundOutput = 131,
    Spell = 22,
    Static = 34,
    StaticCollection = 35,
    StoryBranchNode = 112,
    StoryEventNode = 114,
    StoryQuestNode = 113,
    TES4 = 1,
    TLOD = 74,
    TOFT = 86,
    TalkingActivator = 25,
    TextureSet = 7,
    Topic = 75,
    TopicInfo = 76,
    Tree = 38,
    VoiceType = 98,
    Water = 84,
    Weapon = 41,
    Weather = 54,
    WordOfPower = 118,
    WorldSpace = 71
}
export declare const enum WeaponType {
    Fist = 0,
    Sword = 1,
    Dagger = 2,
    WarAxe = 3,
    Mace = 4,
    Greatsword = 5,
    Battleaxe = 6,
    Warhammer = 6,
    Bow = 7,
    Staff = 8,
    Crossbow = 9
}
export declare const enum EquippedItemType {
    Fist = 0,
    Sword = 1,
    Dagger = 2,
    WarAxe = 3,
    Mace = 4,
    Greatsword = 5,
    Battleaxe = 6,
    Warhammer = 6,
    Bow = 7,
    Staff = 8,
    Spell = 9,
    Shield = 10,
    Torch = 11,
    Crossbow = 12
}
export declare const enum SlotMask {
    Head = 1,
    Hair = 2,
    Body = 4,
    Hands = 8,
    Forearms = 16,
    Amulet = 32,
    Ring = 64,
    Feet = 128,
    Calves = 256,
    Shield = 512,
    Tail = 1024,
    LongHair = 2048,
    Circlet = 4096,
    Ears = 8192,
    Face = 16384,
    Mouth = 16384,
    Neck = 32768,
    ChestOuter = 65536,
    ChestPrimary = 65536,
    Back = 131072,
    Misc01 = 262144,
    PelvisOuter = 524288,
    PelvisPrimary = 524288,
    DecapitateHead = 1048576,
    Decapitate = 2097152,
    PelvisUnder = 4194304,
    PelvisSecondary = 4194304,
    LegOuter = 8388608,
    LegPrimary = 8388608,
    LegUnder = 16777216,
    LegSecondary = 16777216,
    FaceAlt = 33554432,
    Jewelry = 33554432,
    ChestUnder = 67108864,
    ChestSecondary = 67108864,
    Shoulder = 134217728,
    ArmUnder = 268435456,
    ArmSecondary = 268435456,
    ArmLeft = 268435456,
    ArmOuter = 536870912,
    ArmPrimary = 536870912,
    ArmRight = 536870912,
    Misc02 = 1073741824,
    FX01 = 2147483648
}
export declare namespace SendAnimationEventHook {
    class Context {
        readonly selfId: number;
        animEventName: string;
        readonly storage: Map<string, unknown>;
    }
    class LeaveContext extends Context {
        readonly animationSucceeded: boolean;
    }
    class Handler {
        enter(ctx: Context): void;
        leave(ctx: LeaveContext): void;
    }
    class Target {
        add(handler: Handler, minSelfId?: number, maxSelfId?: number, eventPattern?: string): number;
        remove(id: number): void;
    }
}
export declare namespace SendPapyrusEventHook {
    class Context {
        readonly selfId: number;
        readonly papyrusEventName: string;
        readonly storage: Map<string, unknown>;
    }
    class Handler {
        enter(ctx: Context): void;
    }
    class Target {
        add(handler: Handler, minSelfId?: number, maxSelfId?: number, eventPattern?: string): number;
        remove(id: number): void;
    }
}
export declare class Hooks {
    sendAnimationEvent: SendAnimationEventHook.Target;
    sendPapyrusEvent: SendPapyrusEventHook.Target;
}
export declare let hooks: Hooks;
export declare class HttpResponse {
    body: string;
    status: number;
}
export declare type HttpHeaders = Record<string, string>;
export declare class HttpClient {
    constructor(url: string);
    get(path: string, options?: {
        headers?: HttpHeaders;
    }): Promise<HttpResponse>;
    post(path: string, options: {
        body: string;
        contentType: string;
        headers?: HttpHeaders;
    }): Promise<HttpResponse>;
}
export declare class Form extends PapyrusObject {
    static from(papyrusObject: PapyrusObject | null): Form | null;
    getFormID(): number;
    getGoldValue(): number;
    getKeywords(): PapyrusObject[] | null;
    getName(): string;
    getNthKeyword(index: number): Keyword | null;
    getNumKeywords(): number;
    getType(): number;
    getWeight(): number;
    getWorldModelNthTextureSet(n: number): TextureSet | null;
    getWorldModelNumTextureSets(): number;
    getWorldModelPath(): string;
    hasKeyword(akKeyword: Keyword | null): boolean;
    hasWorldModel(): boolean;
    isPlayable(): boolean;
    playerKnows(): boolean;
    registerForActorAction(actionType: number): void;
    registerForAnimationEvent(akSender: ObjectReference | null, asEventName: string): boolean;
    registerForCameraState(): void;
    registerForControl(control: string): void;
    registerForCrosshairRef(): void;
    registerForKey(keyCode: number): void;
    registerForLOS(akViewer: Actor | null, akTarget: ObjectReference | null): void;
    registerForMenu(menuName: string): void;
    registerForModEvent(eventName: string, callbackName: string): void;
    registerForNiNodeUpdate(): void;
    registerForSingleLOSGain(akViewer: Actor | null, akTarget: ObjectReference | null): void;
    registerForSingleLOSLost(akViewer: Actor | null, akTarget: ObjectReference | null): void;
    registerForSingleUpdate(afInterval: number): void;
    registerForSingleUpdateGameTime(afInterval: number): void;
    registerForSleep(): void;
    registerForTrackedStatsEvent(): void;
    registerForUpdate(afInterval: number): void;
    registerForUpdateGameTime(afInterval: number): void;
    sendModEvent(eventName: string, strArg: string, numArg: number): void;
    setGoldValue(value: number): void;
    setName(name: string): void;
    setPlayerKnows(knows: boolean): void;
    setWeight(weight: number): void;
    setWorldModelNthTextureSet(nSet: TextureSet | null, n: number): void;
    setWorldModelPath(path: string): void;
    startObjectProfiling(): void;
    stopObjectProfiling(): void;
    tempClone(): Form | null;
    unregisterForActorAction(actionType: number): void;
    unregisterForAllControls(): void;
    unregisterForAllKeys(): void;
    unregisterForAllMenus(): void;
    unregisterForAllModEvents(): void;
    unregisterForAnimationEvent(akSender: ObjectReference | null, asEventName: string): void;
    unregisterForCameraState(): void;
    unregisterForControl(control: string): void;
    unregisterForCrosshairRef(): void;
    unregisterForKey(keyCode: number): void;
    unregisterForLOS(akViewer: Actor | null, akTarget: ObjectReference | null): void;
    unregisterForMenu(menuName: string): void;
    unregisterForModEvent(eventName: string): void;
    unregisterForNiNodeUpdate(): void;
    unregisterForSleep(): void;
    unregisterForTrackedStatsEvent(): void;
    unregisterForUpdate(): void;
    unregisterForUpdateGameTime(): void;
}
export declare class Action extends Form {
    static from(papyrusObject: PapyrusObject | null): Action | null;
}
export declare class Activator extends Form {
    static from(papyrusObject: PapyrusObject | null): Activator | null;
}
export declare class ActiveMagicEffect extends PapyrusObject {
    static from(papyrusObject: PapyrusObject | null): ActiveMagicEffect | null;
    addInventoryEventFilter(akFilter: Form | null): void;
    dispel(): void;
    getBaseObject(): MagicEffect | null;
    getCasterActor(): Actor | null;
    getDuration(): number;
    getMagnitude(): number;
    getTargetActor(): Actor | null;
    getTimeElapsed(): number;
    registerForActorAction(actionType: number): void;
    registerForAnimationEvent(akSender: ObjectReference | null, asEventName: string): boolean;
    registerForCameraState(): void;
    registerForControl(control: string): void;
    registerForCrosshairRef(): void;
    registerForKey(keyCode: number): void;
    registerForLOS(akViewer: Actor | null, akTarget: ObjectReference | null): void;
    registerForMenu(menuName: string): void;
    registerForModEvent(eventName: string, callbackName: string): void;
    registerForNiNodeUpdate(): void;
    registerForSingleLOSGain(akViewer: Actor | null, akTarget: ObjectReference | null): void;
    registerForSingleLOSLost(akViewer: Actor | null, akTarget: ObjectReference | null): void;
    registerForSingleUpdate(afInterval: number): void;
    registerForSingleUpdateGameTime(afInterval: number): void;
    registerForSleep(): void;
    registerForTrackedStatsEvent(): void;
    registerForUpdate(afInterval: number): void;
    registerForUpdateGameTime(afInterval: number): void;
    removeAllInventoryEventFilters(): void;
    removeInventoryEventFilter(akFilter: Form | null): void;
    sendModEvent(eventName: string, strArg: string, numArg: number): void;
    startObjectProfiling(): void;
    stopObjectProfiling(): void;
    unregisterForActorAction(actionType: number): void;
    unregisterForAllControls(): void;
    unregisterForAllKeys(): void;
    unregisterForAllMenus(): void;
    unregisterForAllModEvents(): void;
    unregisterForAnimationEvent(akSender: ObjectReference | null, asEventName: string): void;
    unregisterForCameraState(): void;
    unregisterForControl(control: string): void;
    unregisterForCrosshairRef(): void;
    unregisterForKey(keyCode: number): void;
    unregisterForLOS(akViewer: Actor | null, akTarget: ObjectReference | null): void;
    unregisterForMenu(menuName: string): void;
    unregisterForModEvent(eventName: string): void;
    unregisterForNiNodeUpdate(): void;
    unregisterForSleep(): void;
    unregisterForTrackedStatsEvent(): void;
    unregisterForUpdate(): void;
    unregisterForUpdateGameTime(): void;
}
export declare class ObjectReference extends Form {
    static from(papyrusObject: PapyrusObject | null): ObjectReference | null;
    activate(akActivator: ObjectReference | null, abDefaultProcessingOnly: boolean): boolean;
    addDependentAnimatedObjectReference(akDependent: ObjectReference | null): boolean;
    addInventoryEventFilter(akFilter: Form | null): void;
    addItem(akItemToAdd: Form | null, aiCount: number, abSilent: boolean): void;
    addToMap(abAllowFastTravel: boolean): void;
    applyHavokImpulse(afX: number, afY: number, afZ: number, afMagnitude: number): Promise<void>;
    blockActivation(abBlocked: boolean): void;
    calculateEncounterLevel(aiDifficulty: number): number;
    canFastTravelToMarker(): boolean;
    clearDestruction(): void;
    createDetectionEvent(akOwner: Actor | null, aiSoundLevel: number): void;
    createEnchantment(maxCharge: number, effects: PapyrusObject[] | null, magnitudes: number[] | null, areas: number[] | null, durations: number[] | null): void;
    damageObject(afDamage: number): Promise<void>;
    delete(): Promise<void>;
    disable(abFadeOut: boolean): Promise<void>;
    disableNoWait(abFadeOut: boolean): void;
    dropObject(akObject: Form | null, aiCount: number): Promise<ObjectReference | null>;
    enable(abFadeIn: boolean): Promise<void>;
    enableFastTravel(abEnable: boolean): void;
    enableNoWait(abFadeIn: boolean): void;
    forceAddRagdollToWorld(): Promise<void>;
    forceRemoveRagdollFromWorld(): Promise<void>;
    getActorOwner(): ActorBase | null;
    getAllForms(toFill: FormList | null): void;
    getAngleX(): number;
    getAngleY(): number;
    getAngleZ(): number;
    getAnimationVariableBool(arVariableName: string): boolean;
    getAnimationVariableFloat(arVariableName: string): number;
    getAnimationVariableInt(arVariableName: string): number;
    getBaseObject(): Form | null;
    getContainerForms(): PapyrusObject[] | null;
    getCurrentDestructionStage(): number;
    getCurrentLocation(): Location | null;
    getCurrentScene(): Scene | null;
    getDisplayName(): string;
    getEditorLocation(): Location | null;
    getEnableParent(): ObjectReference | null;
    getEnchantment(): Enchantment | null;
    getFactionOwner(): Faction | null;
    getHeadingAngle(akOther: ObjectReference | null): number;
    getHeight(): number;
    getItemCharge(): number;
    getItemCount(akItem: Form | null): number;
    getItemHealthPercent(): number;
    getItemMaxCharge(): number;
    getKey(): Key | null;
    getLength(): number;
    getLinkedRef(apKeyword: Keyword | null): ObjectReference | null;
    getLockLevel(): number;
    getMass(): number;
    getNthForm(index: number): Form | null;
    getNthLinkedRef(aiLinkedRef: number): ObjectReference | null;
    getNthReferenceAlias(n: number): ReferenceAlias | null;
    getNumItems(): number;
    getNumReferenceAliases(): number;
    getOpenState(): number;
    getParentCell(): Cell | null;
    getPoison(): Potion | null;
    getPositionX(): number;
    getPositionY(): number;
    getPositionZ(): number;
    getReferenceAliases(): PapyrusObject[] | null;
    getScale(): number;
    getTotalArmorWeight(): number;
    getTotalItemWeight(): number;
    getTriggerObjectCount(): number;
    getVoiceType(): VoiceType | null;
    getWidth(): number;
    getWorldSpace(): WorldSpace | null;
    hasEffectKeyword(akKeyword: Keyword | null): boolean;
    hasNode(asNodeName: string): boolean;
    hasRefType(akRefType: LocationRefType | null): boolean;
    ignoreFriendlyHits(abIgnore: boolean): void;
    interruptCast(): void;
    is3DLoaded(): boolean;
    isActivateChild(akChild: ObjectReference | null): boolean;
    isActivationBlocked(): boolean;
    isDeleted(): boolean;
    isDisabled(): boolean;
    isFurnitureInUse(abIgnoreReserved: boolean): boolean;
    isFurnitureMarkerInUse(aiMarker: number, abIgnoreReserved: boolean): boolean;
    isHarvested(): boolean;
    isIgnoringFriendlyHits(): boolean;
    isInDialogueWithPlayer(): boolean;
    isLockBroken(): boolean;
    isLocked(): boolean;
    isMapMarkerVisible(): boolean;
    isOffLimits(): boolean;
    knockAreaEffect(afMagnitude: number, afRadius: number): void;
    lock(abLock: boolean, abAsOwner: boolean): void;
    moveTo(akTarget: ObjectReference | null, afXOffset: number, afYOffset: number, afZOffset: number, abMatchRotation: boolean): Promise<void>;
    moveToInteractionLocation(akTarget: ObjectReference | null): Promise<void>;
    moveToMyEditorLocation(): Promise<void>;
    moveToNode(akTarget: ObjectReference | null, asNodeName: string): Promise<void>;
    placeActorAtMe(akActorToPlace: ActorBase | null, aiLevelMod: number, akZone: EncounterZone | null): Actor | null;
    placeAtMe(akFormToPlace: Form | null, aiCount: number, abForcePersist: boolean, abInitiallyDisabled: boolean): ObjectReference | null;
    playAnimation(asAnimation: string): boolean;
    playAnimationAndWait(asAnimation: string, asEventName: string): Promise<boolean>;
    playGamebryoAnimation(asAnimation: string, abStartOver: boolean, afEaseInTime: number): boolean;
    playImpactEffect(akImpactEffect: ImpactDataSet | null, asNodeName: string, afPickDirX: number, afPickDirY: number, afPickDirZ: number, afPickLength: number, abApplyNodeRotation: boolean, abUseNodeLocalRotation: boolean): boolean;
    playSyncedAnimationAndWaitSS(asAnimation1: string, asEvent1: string, akObj2: ObjectReference | null, asAnimation2: string, asEvent2: string): Promise<boolean>;
    playSyncedAnimationSS(asAnimation1: string, akObj2: ObjectReference | null, asAnimation2: string): boolean;
    playTerrainEffect(asEffectModelName: string, asAttachBoneName: string): void;
    processTrapHit(akTrap: ObjectReference | null, afDamage: number, afPushback: number, afXVel: number, afYVel: number, afZVel: number, afXPos: number, afYPos: number, afZPos: number, aeMaterial: number, afStagger: number): void;
    pushActorAway(akActorToPush: Actor | null, aiKnockbackForce: number): void;
    removeAllInventoryEventFilters(): void;
    removeAllItems(akTransferTo: ObjectReference | null, abKeepOwnership: boolean, abRemoveQuestItems: boolean): void;
    removeDependentAnimatedObjectReference(akDependent: ObjectReference | null): boolean;
    removeInventoryEventFilter(akFilter: Form | null): void;
    removeItem(akItemToRemove: Form | null, aiCount: number, abSilent: boolean, akOtherContainer: ObjectReference | null): void;
    reset(akTarget: ObjectReference | null): Promise<void>;
    resetInventory(): void;
    say(akTopicToSay: Topic | null, akActorToSpeakAs: Actor | null, abSpeakInPlayersHead: boolean): void;
    sendStealAlarm(akThief: Actor | null): void;
    setActorCause(akActor: Actor | null): void;
    setActorOwner(akActorBase: ActorBase | null): void;
    setAngle(afXAngle: number, afYAngle: number, afZAngle: number): Promise<void>;
    setAnimationVariableBool(arVariableName: string, abNewValue: boolean): void;
    setAnimationVariableFloat(arVariableName: string, afNewValue: number): void;
    setAnimationVariableInt(arVariableName: string, aiNewValue: number): void;
    setDestroyed(abDestroyed: boolean): void;
    setDisplayName(name: string, force: boolean): boolean;
    setEnchantment(source: Enchantment | null, maxCharge: number): void;
    setFactionOwner(akFaction: Faction | null): void;
    setHarvested(harvested: boolean): void;
    setItemCharge(charge: number): void;
    setItemHealthPercent(health: number): void;
    setItemMaxCharge(maxCharge: number): void;
    setLockLevel(aiLockLevel: number): void;
    setMotionType(aeMotionType: MotionType, abAllowActivate: boolean): Promise<void>;
    setNoFavorAllowed(abNoFavor: boolean): void;
    setOpen(abOpen: boolean): void;
    setPosition(afX: number, afY: number, afZ: number): Promise<void>;
    setScale(afScale: number): Promise<void>;
    splineTranslateTo(afX: number, afY: number, afZ: number, afXAngle: number, afYAngle: number, afZAngle: number, afTangentMagnitude: number, afSpeed: number, afMaxRotationSpeed: number): void;
    splineTranslateToRefNode(arTarget: ObjectReference | null, arNodeName: string, afTangentMagnitude: number, afSpeed: number, afMaxRotationSpeed: number): void;
    stopTranslation(): void;
    tetherToHorse(akHorse: ObjectReference | null): void;
    translateTo(afX: number, afY: number, afZ: number, afXAngle: number, afYAngle: number, afZAngle: number, afSpeed: number, afMaxRotationSpeed: number): void;
    waitForAnimationEvent(asEventName: string): Promise<boolean>;
    getDistance(akOther: ObjectReference | null): number;
}
export declare class Actor extends ObjectReference {
    static from(papyrusObject: PapyrusObject | null): Actor | null;
    addPerk(akPerk: Perk | null): void;
    addShout(akShout: Shout | null): boolean;
    addSpell(akSpell: Spell | null, abVerbose: boolean): boolean;
    allowBleedoutDialogue(abCanTalk: boolean): void;
    allowPCDialogue(abTalk: boolean): void;
    attachAshPile(akAshPileBase: Form | null): void;
    canFlyHere(): boolean;
    changeHeadPart(hPart: HeadPart | null): void;
    clearArrested(): void;
    clearExpressionOverride(): void;
    clearExtraArrows(): void;
    clearForcedMovement(): void;
    clearKeepOffsetFromActor(): void;
    clearLookAt(): void;
    damageActorValue(asValueName: string, afDamage: number): void;
    dismount(): boolean;
    dispelAllSpells(): void;
    dispelSpell(akSpell: Spell | null): boolean;
    doCombatSpellApply(akSpell: Spell | null, akTarget: ObjectReference | null): void;
    drawWeapon(): void;
    enableAI(abEnable: boolean): void;
    endDeferredKill(): void;
    equipItem(akItem: Form | null, abPreventRemoval: boolean, abSilent: boolean): void;
    equipItemById(item: Form | null, itemId: number, equipSlot: number, preventUnequip: boolean, equipSound: boolean): void;
    equipItemEx(item: Form | null, equipSlot: number, preventUnequip: boolean, equipSound: boolean): void;
    equipShout(akShout: Shout | null): void;
    equipSpell(akSpell: Spell | null, aiSource: number): void;
    evaluatePackage(): void;
    forceActorValue(asValueName: string, afNewValue: number): void;
    forceMovementDirection(afXAngle: number, afYAngle: number, afZAngle: number): void;
    forceMovementDirectionRamp(afXAngle: number, afYAngle: number, afZAngle: number, afRampTime: number): void;
    forceMovementRotationSpeed(afXMult: number, afYMult: number, afZMult: number): void;
    forceMovementRotationSpeedRamp(afXMult: number, afYMult: number, afZMult: number, afRampTime: number): void;
    forceMovementSpeed(afSpeedMult: number): void;
    forceMovementSpeedRamp(afSpeedMult: number, afRampTime: number): void;
    forceTargetAngle(afXAngle: number, afYAngle: number, afZAngle: number): void;
    forceTargetDirection(afXAngle: number, afYAngle: number, afZAngle: number): void;
    forceTargetSpeed(afSpeed: number): void;
    getActorValue(asValueName: string): number;
    getActorValueMax(asValueName: string): number;
    getActorValuePercentage(asValueName: string): number;
    getBaseActorValue(asValueName: string): number;
    getBribeAmount(): number;
    getCombatState(): number;
    getCombatTarget(): Actor | null;
    getCrimeFaction(): Faction | null;
    getCurrentPackage(): Package | null;
    getDialogueTarget(): Actor | null;
    getEquippedArmorInSlot(aiSlot: number): Armor | null;
    getEquippedItemId(Location: number): number;
    getEquippedItemType(aiHand: number): number;
    getEquippedObject(Location: number): Form | null;
    getEquippedShield(): Armor | null;
    getEquippedShout(): Shout | null;
    getEquippedSpell(aiSource: number): Spell | null;
    getEquippedWeapon(abLeftHand: boolean): Weapon | null;
    getFactionRank(akFaction: Faction | null): number;
    getFactionReaction(akOther: Actor | null): number;
    getFactions(minRank: number, maxRank: number): PapyrusObject[] | null;
    getFlyingState(): number;
    getForcedLandingMarker(): ObjectReference | null;
    getFurnitureReference(): ObjectReference | null;
    getGoldAmount(): number;
    getHighestRelationshipRank(): number;
    getKiller(): Actor | null;
    getLevel(): number;
    getLeveledActorBase(): ActorBase | null;
    getLightLevel(): number;
    getLowestRelationshipRank(): number;
    getNoBleedoutRecovery(): boolean;
    getNthSpell(n: number): Spell | null;
    getPlayerControls(): boolean;
    getRace(): Race | null;
    getRelationshipRank(akOther: Actor | null): number;
    getSitState(): number;
    getSleepState(): number;
    getSpellCount(): number;
    getVoiceRecoveryTime(): number;
    getWarmthRating(): number;
    getWornForm(slotMask: number): Form | null;
    getWornItemId(slotMask: number): number;
    hasAssociation(akAssociation: AssociationType | null, akOther: Actor | null): boolean;
    hasFamilyRelationship(akOther: Actor | null): boolean;
    hasLOS(akOther: ObjectReference | null): boolean;
    hasMagicEffect(akEffect: MagicEffect | null): boolean;
    hasMagicEffectWithKeyword(akKeyword: Keyword | null): boolean;
    hasParentRelationship(akOther: Actor | null): boolean;
    hasPerk(akPerk: Perk | null): boolean;
    hasSpell(akForm: Form | null): boolean;
    isAIEnabled(): boolean;
    isAlarmed(): boolean;
    isAlerted(): boolean;
    isAllowedToFly(): boolean;
    isArrested(): boolean;
    isArrestingTarget(): boolean;
    isBeingRidden(): boolean;
    isBleedingOut(): boolean;
    isBribed(): boolean;
    isChild(): boolean;
    isCommandedActor(): boolean;
    isDead(): boolean;
    isDetectedBy(akOther: Actor | null): boolean;
    isDoingFavor(): boolean;
    isEquipped(akItem: Form | null): boolean;
    isEssential(): boolean;
    isFlying(): boolean;
    isGhost(): boolean;
    isGuard(): boolean;
    isHostileToActor(akActor: Actor | null): boolean;
    isInCombat(): boolean;
    isInFaction(akFaction: Faction | null): boolean;
    isInKillMove(): boolean;
    isIntimidated(): boolean;
    isOnMount(): boolean;
    isOverEncumbered(): boolean;
    isPlayerTeammate(): boolean;
    isPlayersLastRiddenHorse(): boolean;
    isRunning(): boolean;
    isSneaking(): boolean;
    isSprinting(): boolean;
    isSwimming(): boolean;
    isTrespassing(): boolean;
    isUnconscious(): boolean;
    isWeaponDrawn(): boolean;
    keepOffsetFromActor(arTarget: Actor | null, afOffsetX: number, afOffsetY: number, afOffsetZ: number, afOffsetAngleX: number, afOffsetAngleY: number, afOffsetAngleZ: number, afCatchUpRadius: number, afFollowRadius: number): void;
    kill(akKiller: Actor | null): void;
    killSilent(akKiller: Actor | null): void;
    modActorValue(asValueName: string, afAmount: number): void;
    modFactionRank(akFaction: Faction | null, aiMod: number): void;
    moveToPackageLocation(): Promise<void>;
    openInventory(abForceOpen: boolean): void;
    pathToReference(aTarget: ObjectReference | null, afWalkRunPercent: number): Promise<boolean>;
    playIdle(akIdle: Idle | null): boolean;
    playIdleWithTarget(akIdle: Idle | null, akTarget: ObjectReference | null): boolean;
    playSubGraphAnimation(asEventName: string): void;
    queueNiNodeUpdate(): void;
    regenerateHead(): void;
    removeFromAllFactions(): void;
    removeFromFaction(akFaction: Faction | null): void;
    removePerk(akPerk: Perk | null): void;
    removeShout(akShout: Shout | null): boolean;
    removeSpell(akSpell: Spell | null): boolean;
    replaceHeadPart(oPart: HeadPart | null, newPart: HeadPart | null): void;
    resetAI(): void;
    resetExpressionOverrides(): void;
    resetHealthAndLimbs(): void;
    restoreActorValue(asValueName: string, afAmount: number): void;
    resurrect(): Promise<void>;
    sendAssaultAlarm(): void;
    sendLycanthropyStateChanged(abIsWerewolf: boolean): void;
    sendTrespassAlarm(akCriminal: Actor | null): void;
    sendVampirismStateChanged(abIsVampire: boolean): void;
    setActorValue(asValueName: string, afValue: number): void;
    setAlert(abAlerted: boolean): void;
    setAllowFlying(abAllowed: boolean): void;
    setAllowFlyingEx(abAllowed: boolean, abAllowCrash: boolean, abAllowSearch: boolean): void;
    setAlpha(afTargetAlpha: number, abFade: boolean): void;
    setAttackActorOnSight(abAttackOnSight: boolean): void;
    setBribed(abBribe: boolean): void;
    setCrimeFaction(akFaction: Faction | null): void;
    setCriticalStage(aiStage: number): void;
    setDoingFavor(abDoingFavor: boolean): void;
    setDontMove(abDontMove: boolean): void;
    setExpressionModifier(index: number, value: number): void;
    setExpressionOverride(aiMood: number, aiStrength: number): void;
    setExpressionPhoneme(index: number, value: number): void;
    setEyeTexture(akNewTexture: TextureSet | null): void;
    setFactionRank(akFaction: Faction | null, aiRank: number): void;
    setForcedLandingMarker(aMarker: ObjectReference | null): void;
    setGhost(abIsGhost: boolean): void;
    setHeadTracking(abEnable: boolean): void;
    setIntimidated(abIntimidate: boolean): void;
    setLookAt(akTarget: ObjectReference | null, abPathingLookAt: boolean): void;
    setNoBleedoutRecovery(abAllowed: boolean): void;
    setNotShowOnStealthMeter(abNotShow: boolean): void;
    setOutfit(akOutfit: Outfit | null, abSleepOutfit: boolean): void;
    setPlayerControls(abControls: boolean): void;
    setPlayerResistingArrest(): void;
    setPlayerTeammate(abTeammate: boolean, abCanDoFavor: boolean): void;
    setRace(akRace: Race | null): void;
    setRelationshipRank(akOther: Actor | null, aiRank: number): void;
    setRestrained(abRestrained: boolean): void;
    setSubGraphFloatVariable(asVariableName: string, afValue: number): void;
    setUnconscious(abUnconscious: boolean): void;
    setVehicle(akVehicle: ObjectReference | null): void;
    setVoiceRecoveryTime(afTime: number): void;
    sheatheWeapon(): void;
    showBarterMenu(): void;
    showGiftMenu(abGivingGift: boolean, apFilterList: FormList | null, abShowStolenItems: boolean, abUseFavorPoints: boolean): Promise<number>;
    startCannibal(akTarget: Actor | null): void;
    startCombat(akTarget: Actor | null): void;
    startDeferredKill(): void;
    startSneaking(): void;
    startVampireFeed(akTarget: Actor | null): void;
    stopCombat(): void;
    stopCombatAlarm(): void;
    trapSoul(akTarget: Actor | null): boolean;
    unLockOwnedDoorsInCell(): void;
    unequipAll(): void;
    unequipItem(akItem: Form | null, abPreventEquip: boolean, abSilent: boolean): void;
    unequipItemEx(item: Form | null, equipSlot: number, preventEquip: boolean): void;
    unequipItemSlot(aiSlot: number): void;
    unequipShout(akShout: Shout | null): void;
    unequipSpell(akSpell: Spell | null, aiSource: number): void;
    updateWeight(neckDelta: number): void;
    willIntimidateSucceed(): boolean;
    wornHasKeyword(akKeyword: Keyword | null): boolean;
}
export declare class ActorBase extends Form {
    static from(papyrusObject: PapyrusObject | null): ActorBase | null;
    getClass(): Class | null;
    getCombatStyle(): CombatStyle | null;
    getDeadCount(): number;
    getFaceMorph(index: number): number;
    getFacePreset(index: number): number;
    getFaceTextureSet(): TextureSet | null;
    getGiftFilter(): FormList | null;
    getHairColor(): ColorForm | null;
    getHeight(): number;
    getIndexOfHeadPartByType(type: number): number;
    getIndexOfOverlayHeadPartByType(type: number): number;
    getNthHeadPart(slotPart: number): HeadPart | null;
    getNthOverlayHeadPart(slotPart: number): HeadPart | null;
    getNthSpell(n: number): Spell | null;
    getNumHeadParts(): number;
    getNumOverlayHeadParts(): number;
    getOutfit(bSleepOutfit: boolean): Outfit | null;
    getRace(): Race | null;
    getSex(): number;
    getSkin(): Armor | null;
    getSkinFar(): Armor | null;
    getSpellCount(): number;
    getTemplate(): ActorBase | null;
    getVoiceType(): VoiceType | null;
    getWeight(): number;
    isEssential(): boolean;
    isInvulnerable(): boolean;
    isProtected(): boolean;
    isUnique(): boolean;
    setClass(c: Class | null): void;
    setCombatStyle(cs: CombatStyle | null): void;
    setEssential(abEssential: boolean): void;
    setFaceMorph(value: number, index: number): void;
    setFacePreset(value: number, index: number): void;
    setFaceTextureSet(textures: TextureSet | null): void;
    setHairColor(color: ColorForm | null): void;
    setHeight(height: number): void;
    setInvulnerable(abInvulnerable: boolean): void;
    setNthHeadPart(HeadPart: HeadPart | null, slotPart: number): void;
    setOutfit(akOutfit: Outfit | null, abSleepOutfit: boolean): void;
    setProtected(abProtected: boolean): void;
    setSkin(skin: Armor | null): void;
    setSkinFar(skin: Armor | null): void;
    setVoiceType(nVoice: VoiceType | null): void;
    setWeight(weight: number): void;
}
export declare class ActorValueInfo extends Form {
    static from(papyrusObject: PapyrusObject | null): ActorValueInfo | null;
    addSkillExperience(exp: number): void;
    getBaseValue(akActor: Actor | null): number;
    getCurrentValue(akActor: Actor | null): number;
    getExperienceForLevel(currentLevel: number): number;
    getMaximumValue(akActor: Actor | null): number;
    getPerkTree(list: FormList | null, akActor: Actor | null, unowned: boolean, allRanks: boolean): void;
    getPerks(akActor: Actor | null, unowned: boolean, allRanks: boolean): PapyrusObject[] | null;
    getSkillExperience(): number;
    getSkillImproveMult(): number;
    getSkillImproveOffset(): number;
    getSkillLegendaryLevel(): number;
    getSkillOffsetMult(): number;
    getSkillUseMult(): number;
    isSkill(): boolean;
    setSkillExperience(exp: number): void;
    setSkillImproveMult(value: number): void;
    setSkillImproveOffset(value: number): void;
    setSkillLegendaryLevel(level: number): void;
    setSkillOffsetMult(value: number): void;
    setSkillUseMult(value: number): void;
    static getActorValueInfoByID(id: number): ActorValueInfo | null;
    static getActorValueInfoByName(avName: string): ActorValueInfo | null;
}
export declare class Alias extends PapyrusObject {
    static from(papyrusObject: PapyrusObject | null): Alias | null;
    getID(): number;
    getName(): string;
    getOwningQuest(): Quest | null;
    registerForActorAction(actionType: number): void;
    registerForAnimationEvent(akSender: ObjectReference | null, asEventName: string): boolean;
    registerForCameraState(): void;
    registerForControl(control: string): void;
    registerForCrosshairRef(): void;
    registerForKey(keyCode: number): void;
    registerForLOS(akViewer: Actor | null, akTarget: ObjectReference | null): void;
    registerForMenu(menuName: string): void;
    registerForModEvent(eventName: string, callbackName: string): void;
    registerForNiNodeUpdate(): void;
    registerForSingleLOSGain(akViewer: Actor | null, akTarget: ObjectReference | null): void;
    registerForSingleLOSLost(akViewer: Actor | null, akTarget: ObjectReference | null): void;
    registerForSingleUpdate(afInterval: number): void;
    registerForSingleUpdateGameTime(afInterval: number): void;
    registerForSleep(): void;
    registerForTrackedStatsEvent(): void;
    registerForUpdate(afInterval: number): void;
    registerForUpdateGameTime(afInterval: number): void;
    sendModEvent(eventName: string, strArg: string, numArg: number): void;
    startObjectProfiling(): void;
    stopObjectProfiling(): void;
    unregisterForActorAction(actionType: number): void;
    unregisterForAllControls(): void;
    unregisterForAllKeys(): void;
    unregisterForAllMenus(): void;
    unregisterForAllModEvents(): void;
    unregisterForAnimationEvent(akSender: ObjectReference | null, asEventName: string): void;
    unregisterForCameraState(): void;
    unregisterForControl(control: string): void;
    unregisterForCrosshairRef(): void;
    unregisterForKey(keyCode: number): void;
    unregisterForLOS(akViewer: Actor | null, akTarget: ObjectReference | null): void;
    unregisterForMenu(menuName: string): void;
    unregisterForModEvent(eventName: string): void;
    unregisterForNiNodeUpdate(): void;
    unregisterForSleep(): void;
    unregisterForTrackedStatsEvent(): void;
    unregisterForUpdate(): void;
    unregisterForUpdateGameTime(): void;
}
export declare class Ammo extends Form {
    static from(papyrusObject: PapyrusObject | null): Ammo | null;
    getDamage(): number;
    getProjectile(): Projectile | null;
    isBolt(): boolean;
}
export declare class MiscObject extends Form {
    static from(papyrusObject: PapyrusObject | null): MiscObject | null;
}
export declare class Apparatus extends MiscObject {
    static from(papyrusObject: PapyrusObject | null): Apparatus | null;
    getQuality(): number;
    setQuality(quality: number): void;
}
export declare class Armor extends Form {
    static from(papyrusObject: PapyrusObject | null): Armor | null;
    addSlotToMask(slotMask: number): number;
    getArmorRating(): number;
    getEnchantment(): Enchantment | null;
    getIconPath(bFemalePath: boolean): string;
    getMessageIconPath(bFemalePath: boolean): string;
    getModelPath(bFemalePath: boolean): string;
    getNthArmorAddon(n: number): ArmorAddon | null;
    getNumArmorAddons(): number;
    getSlotMask(): number;
    getWarmthRating(): number;
    getWeightClass(): number;
    modArmorRating(modBy: number): void;
    removeSlotFromMask(slotMask: number): number;
    setArmorRating(armorRating: number): void;
    setEnchantment(e: Enchantment | null): void;
    setIconPath(path: string, bFemalePath: boolean): void;
    setMessageIconPath(path: string, bFemalePath: boolean): void;
    setModelPath(path: string, bFemalePath: boolean): void;
    setSlotMask(slotMask: number): void;
    setWeightClass(weightClass: number): void;
    static getMaskForSlot(slot: number): number;
}
export declare class ArmorAddon extends Form {
    static from(papyrusObject: PapyrusObject | null): ArmorAddon | null;
    addSlotToMask(slotMask: number): number;
    getModelNthTextureSet(n: number, first: boolean, female: boolean): TextureSet | null;
    getModelNumTextureSets(first: boolean, female: boolean): number;
    getModelPath(firstPerson: boolean, female: boolean): string;
    getNthAdditionalRace(n: number): Race | null;
    getNumAdditionalRaces(): number;
    getSlotMask(): number;
    removeSlotFromMask(slotMask: number): number;
    setModelNthTextureSet(texture: TextureSet | null, n: number, first: boolean, female: boolean): void;
    setModelPath(path: string, firstPerson: boolean, female: boolean): void;
    setSlotMask(slotMask: number): void;
}
export declare class Art extends Form {
    static from(papyrusObject: PapyrusObject | null): Art | null;
    getModelPath(): string;
    setModelPath(path: string): void;
}
export declare class AssociationType extends Form {
    static from(papyrusObject: PapyrusObject | null): AssociationType | null;
}
export declare class Book extends Form {
    static from(papyrusObject: PapyrusObject | null): Book | null;
    getSkill(): number;
    getSpell(): Spell | null;
    isRead(): boolean;
    isTakeable(): boolean;
}
export declare class Cell extends Form {
    static from(papyrusObject: PapyrusObject | null): Cell | null;
    getActorOwner(): ActorBase | null;
    getFactionOwner(): Faction | null;
    getNthRef(n: number, formTypeFilter: number): ObjectReference | null;
    getNumRefs(formTypeFilter: number): number;
    getWaterLevel(): number;
    isAttached(): boolean;
    isInterior(): boolean;
    reset(): void;
    setActorOwner(akActor: ActorBase | null): void;
    setFactionOwner(akFaction: Faction | null): void;
    setFogColor(aiNearRed: number, aiNearGreen: number, aiNearBlue: number, aiFarRed: number, aiFarGreen: number, aiFarBlue: number): void;
    setFogPlanes(afNear: number, afFar: number): void;
    setFogPower(afPower: number): void;
    setPublic(abPublic: boolean): void;
}
export declare class Class extends Form {
    static from(papyrusObject: PapyrusObject | null): Class | null;
}
export declare class ColorForm extends Form {
    static from(papyrusObject: PapyrusObject | null): ColorForm | null;
    getColor(): number;
    setColor(color: number): void;
}
export declare class CombatStyle extends Form {
    static from(papyrusObject: PapyrusObject | null): CombatStyle | null;
    getAllowDualWielding(): boolean;
    getAvoidThreatChance(): number;
    getCloseRangeDuelingCircleMult(): number;
    getCloseRangeDuelingFallbackMult(): number;
    getCloseRangeFlankingFlankDistance(): number;
    getCloseRangeFlankingStalkTime(): number;
    getDefensiveMult(): number;
    getFlightDiveBombChance(): number;
    getFlightFlyingAttackChance(): number;
    getFlightHoverChance(): number;
    getGroupOffensiveMult(): number;
    getLongRangeStrafeMult(): number;
    getMagicMult(): number;
    getMeleeAttackStaggeredMult(): number;
    getMeleeBashAttackMult(): number;
    getMeleeBashMult(): number;
    getMeleeBashPowerAttackMult(): number;
    getMeleeBashRecoiledMult(): number;
    getMeleeMult(): number;
    getMeleePowerAttackBlockingMult(): number;
    getMeleePowerAttackStaggeredMult(): number;
    getMeleeSpecialAttackMult(): number;
    getOffensiveMult(): number;
    getRangedMult(): number;
    getShoutMult(): number;
    getStaffMult(): number;
    getUnarmedMult(): number;
    setAllowDualWielding(allow: boolean): void;
    setAvoidThreatChance(chance: number): void;
    setCloseRangeDuelingCircleMult(mult: number): void;
    setCloseRangeDuelingFallbackMult(mult: number): void;
    setCloseRangeFlankingFlankDistance(mult: number): void;
    setCloseRangeFlankingStalkTime(mult: number): void;
    setDefensiveMult(mult: number): void;
    setFlightDiveBombChance(chance: number): void;
    setFlightFlyingAttackChance(mult: number): void;
    setFlightHoverChance(chance: number): void;
    setGroupOffensiveMult(mult: number): void;
    setLongRangeStrafeMult(mult: number): void;
    setMagicMult(mult: number): void;
    setMeleeAttackStaggeredMult(mult: number): void;
    setMeleeBashAttackMult(mult: number): void;
    setMeleeBashMult(mult: number): void;
    setMeleeBashPowerAttackMult(mult: number): void;
    setMeleeBashRecoiledMult(mult: number): void;
    setMeleeMult(mult: number): void;
    setMeleePowerAttackBlockingMult(mult: number): void;
    setMeleePowerAttackStaggeredMult(mult: number): void;
    setMeleeSpecialAttackMult(mult: number): void;
    setOffensiveMult(mult: number): void;
    setRangedMult(mult: number): void;
    setShoutMult(mult: number): void;
    setStaffMult(mult: number): void;
    setUnarmedMult(mult: number): void;
}
export declare class ConstructibleObject extends MiscObject {
    static from(papyrusObject: PapyrusObject | null): ConstructibleObject | null;
    getNthIngredient(n: number): Form | null;
    getNthIngredientQuantity(n: number): number;
    getNumIngredients(): number;
    getResult(): Form | null;
    getResultQuantity(): number;
    getWorkbenchKeyword(): Keyword | null;
    setNthIngredient(required: Form | null, n: number): void;
    setNthIngredientQuantity(value: number, n: number): void;
    setResult(result: Form | null): void;
    setResultQuantity(quantity: number): void;
    setWorkbenchKeyword(aKeyword: Keyword | null): void;
}
export declare class Container extends Form {
    static from(papyrusObject: PapyrusObject | null): Container | null;
}
export declare class Debug extends PapyrusObject {
    static from(papyrusObject: PapyrusObject | null): Debug | null;
    static centerOnCell(param1: string): void;
    static centerOnCellAndWait(param1: string): Promise<number>;
    static closeUserLog(param1: string): void;
    static dBSendPlayerPosition(): void;
    static debugChannelNotify(param1: string, param2: string): void;
    static dumpAliasData(param1: Quest | null): void;
    static getConfigName(): Promise<string>;
    static getPlatformName(): Promise<string>;
    static getVersionNumber(): Promise<string>;
    static messageBox(param1: string): void;
    static notification(param1: string): void;
    static openUserLog(param1: string): boolean;
    static playerMoveToAndWait(param1: string): Promise<number>;
    static quitGame(): void;
    static sendAnimationEvent(param1: ObjectReference | null, param2: string): void;
    static setFootIK(param1: boolean): void;
    static setGodMode(param1: boolean): void;
    static showRefPosition(arRef: ObjectReference | null): void;
    static startScriptProfiling(param1: string): void;
    static startStackProfiling(): void;
    static stopScriptProfiling(param1: string): void;
    static stopStackProfiling(): void;
    static takeScreenshot(param1: string): void;
    static toggleAI(): void;
    static toggleCollisions(): void;
    static toggleMenus(): void;
    static trace(param1: string, param2: number): void;
    static traceStack(param1: string, param2: number): void;
    static traceUser(param1: string, param2: string, param3: number): boolean;
}
export declare class DefaultObjectManager extends Form {
    static from(papyrusObject: PapyrusObject | null): DefaultObjectManager | null;
    getForm(key: string): Form | null;
    setForm(key: string, newForm: Form | null): void;
}
export declare class Door extends Form {
    static from(papyrusObject: PapyrusObject | null): Door | null;
}
export declare class EffectShader extends Form {
    static from(papyrusObject: PapyrusObject | null): EffectShader | null;
    play(param1: ObjectReference | null, param2: number): void;
    stop(param1: ObjectReference | null): void;
}
export declare class Enchantment extends Form {
    static from(papyrusObject: PapyrusObject | null): Enchantment | null;
    getBaseEnchantment(): Enchantment | null;
    getCostliestEffectIndex(): number;
    getKeywordRestrictions(): FormList | null;
    getNthEffectArea(index: number): number;
    getNthEffectDuration(index: number): number;
    getNthEffectMagicEffect(index: number): MagicEffect | null;
    getNthEffectMagnitude(index: number): number;
    getNumEffects(): number;
    isHostile(): boolean;
    setKeywordRestrictions(newKeywordList: FormList | null): void;
    setNthEffectArea(index: number, value: number): void;
    setNthEffectDuration(index: number, value: number): void;
    setNthEffectMagnitude(index: number, value: number): void;
}
export declare class EncounterZone extends Form {
    static from(papyrusObject: PapyrusObject | null): EncounterZone | null;
}
export declare class EquipSlot extends Form {
    static from(papyrusObject: PapyrusObject | null): EquipSlot | null;
    getNthParent(n: number): EquipSlot | null;
    getNumParents(): number;
}
export declare class Explosion extends Form {
    static from(papyrusObject: PapyrusObject | null): Explosion | null;
}
export declare class Faction extends Form {
    static from(papyrusObject: PapyrusObject | null): Faction | null;
    canPayCrimeGold(): boolean;
    clearFactionFlag(flag: number): void;
    getBuySellList(): FormList | null;
    getCrimeGold(): number;
    getCrimeGoldNonViolent(): number;
    getCrimeGoldViolent(): number;
    getInfamy(): number;
    getInfamyNonViolent(): number;
    getInfamyViolent(): number;
    getMerchantContainer(): ObjectReference | null;
    getReaction(akOther: Faction | null): number;
    getStolenItemValueCrime(): number;
    getStolenItemValueNoCrime(): number;
    getVendorEndHour(): number;
    getVendorRadius(): number;
    getVendorStartHour(): number;
    isFactionFlagSet(flag: number): boolean;
    isFactionInCrimeGroup(akOther: Faction | null): boolean;
    isNotSellBuy(): boolean;
    isPlayerExpelled(): boolean;
    modCrimeGold(aiAmount: number, abViolent: boolean): void;
    modReaction(akOther: Faction | null, aiAmount: number): void;
    onlyBuysStolenItems(): boolean;
    playerPayCrimeGold(abRemoveStolenItems: boolean, abGoToJail: boolean): void;
    sendAssaultAlarm(): void;
    sendPlayerToJail(abRemoveInventory: boolean, abRealJail: boolean): Promise<void>;
    setAlly(akOther: Faction | null, abSelfIsFriendToOther: boolean, abOtherIsFriendToSelf: boolean): void;
    setBuySellList(akList: FormList | null): void;
    setCrimeGold(aiGold: number): void;
    setCrimeGoldViolent(aiGold: number): void;
    setEnemy(akOther: Faction | null, abSelfIsNeutralToOther: boolean, abOtherIsNeutralToSelf: boolean): void;
    setFactionFlag(flag: number): void;
    setMerchantContainer(akContainer: ObjectReference | null): void;
    setNotSellBuy(notSellBuy: boolean): void;
    setOnlyBuysStolenItems(onlyStolen: boolean): void;
    setPlayerEnemy(abIsEnemy: boolean): void;
    setPlayerExpelled(abIsExpelled: boolean): void;
    setReaction(akOther: Faction | null, aiNewValue: number): void;
    setVendorEndHour(hour: number): void;
    setVendorRadius(radius: number): void;
    setVendorStartHour(hour: number): void;
}
export declare class Flora extends Activator {
    static from(papyrusObject: PapyrusObject | null): Flora | null;
    getHarvestSound(): SoundDescriptor | null;
    getIngredient(): Form | null;
    setHarvestSound(akSoundDescriptor: SoundDescriptor | null): void;
    setIngredient(akIngredient: Form | null): void;
}
export declare class FormList extends Form {
    static from(papyrusObject: PapyrusObject | null): FormList | null;
    addForm(apForm: Form | null): void;
    addForms(forms: PapyrusObject[] | null): void;
    find(apForm: Form | null): number;
    getAt(aiIndex: number): Form | null;
    getSize(): number;
    hasForm(akForm: Form | null): boolean;
    removeAddedForm(apForm: Form | null): void;
    revert(): void;
    toArray(): PapyrusObject[] | null;
}
export declare class Furniture extends Activator {
    static from(papyrusObject: PapyrusObject | null): Furniture | null;
}
export declare class Game extends PapyrusObject {
    static from(papyrusObject: PapyrusObject | null): Game | null;
    static addAchievement(aiAchievementID: number): void;
    static addHavokBallAndSocketConstraint(arRefA: ObjectReference | null, arRefANode: string, arRefB: ObjectReference | null, arRefBNode: string, afRefALocalOffsetX: number, afRefALocalOffsetY: number, afRefALocalOffsetZ: number, afRefBLocalOffsetX: number, afRefBLocalOffsetY: number, afRefBLocalOffsetZ: number): Promise<boolean>;
    static addPerkPoints(aiPerkPoints: number): void;
    static advanceSkill(asSkillName: string, afMagnitude: number): void;
    static calculateFavorCost(aiFavorPrice: number): number;
    static clearPrison(): void;
    static clearTempEffects(): void;
    static disablePlayerControls(abMovement: boolean, abFighting: boolean, abCamSwitch: boolean, abLooking: boolean, abSneaking: boolean, abMenu: boolean, abActivate: boolean, abJournalTabs: boolean, aiDisablePOVType: number): void;
    static enableFastTravel(abEnable: boolean): void;
    static enablePlayerControls(abMovement: boolean, abFighting: boolean, abCamSwitch: boolean, abLooking: boolean, abSneaking: boolean, abMenu: boolean, abActivate: boolean, abJournalTabs: boolean, aiDisablePOVType: number): void;
    static fadeOutGame(abFadingOut: boolean, abBlackFade: boolean, afSecsBeforeFade: number, afFadeDuration: number): void;
    static fastTravel(akDestination: ObjectReference | null): void;
    static findClosestActor(afX: number, afY: number, afZ: number, afRadius: number): Actor | null;
    static findClosestReferenceOfAnyTypeInList(arBaseObjects: FormList | null, afX: number, afY: number, afZ: number, afRadius: number): ObjectReference | null;
    static findClosestReferenceOfType(arBaseObject: Form | null, afX: number, afY: number, afZ: number, afRadius: number): ObjectReference | null;
    static findRandomActor(afX: number, afY: number, afZ: number, afRadius: number): Actor | null;
    static findRandomReferenceOfAnyTypeInList(arBaseObjects: FormList | null, afX: number, afY: number, afZ: number, afRadius: number): ObjectReference | null;
    static findRandomReferenceOfType(arBaseObject: Form | null, afX: number, afY: number, afZ: number, afRadius: number): ObjectReference | null;
    static forceFirstPerson(): void;
    static forceThirdPerson(): void;
    static getCameraState(): number;
    static getCurrentConsoleRef(): ObjectReference | null;
    static getCurrentCrosshairRef(): ObjectReference | null;
    static getDialogueTarget(): ObjectReference | null;
    static getExperienceForLevel(currentLevel: number): number;
    static getForm(aiFormID: number): Form | null;
    static getFormEx(formId: number): Form | null;
    static getFormFromFile(aiFormID: number, asFilename: string): Form | null;
    static getGameSettingFloat(asGameSetting: string): number;
    static getGameSettingInt(asGameSetting: string): number;
    static getGameSettingString(asGameSetting: string): Promise<string>;
    static getHotkeyBoundObject(hotkey: number): Form | null;
    static getLightModAuthor(idx: number): string;
    static getLightModByName(name: string): number;
    static getLightModCount(): number;
    static getLightModDependencyCount(idx: number): number;
    static getLightModDescription(idx: number): string;
    static getLightModName(idx: number): string;
    static getModAuthor(modIndex: number): string;
    static getModByName(name: string): number;
    static getModCount(): number;
    static getModDependencyCount(modIndex: number): number;
    static getModDescription(modIndex: number): string;
    static getModName(modIndex: number): string;
    static getNthLightModDependency(modIdx: number, idx: number): number;
    static getNthTintMaskColor(n: number): number;
    static getNthTintMaskTexturePath(n: number): string;
    static getNthTintMaskType(n: number): number;
    static getNumTintMasks(): number;
    static getNumTintsByType(type: number): number;
    static getPerkPoints(): number;
    static getPlayerExperience(): number;
    static getPlayerGrabbedRef(): ObjectReference | null;
    static getPlayerMovementMode(): boolean;
    static getPlayersLastRiddenHorse(): Actor | null;
    static getRealHoursPassed(): number;
    static getSunPositionX(): number;
    static getSunPositionY(): number;
    static getSunPositionZ(): number;
    static getTintMaskColor(type: number, index: number): number;
    static getTintMaskTexturePath(type: number, index: number): string;
    static hideTitleSequenceMenu(): void;
    static incrementSkill(asSkillName: string): void;
    static incrementSkillBy(asSkillName: string, aiCount: number): void;
    static incrementStat(asStatName: string, aiModAmount: number): void;
    static isActivateControlsEnabled(): boolean;
    static isCamSwitchControlsEnabled(): boolean;
    static isFastTravelControlsEnabled(): boolean;
    static isFastTravelEnabled(): boolean;
    static isFightingControlsEnabled(): boolean;
    static isJournalControlsEnabled(): boolean;
    static isLookingControlsEnabled(): boolean;
    static isMenuControlsEnabled(): boolean;
    static isMovementControlsEnabled(): boolean;
    static isObjectFavorited(Form: Form | null): boolean;
    static isPlayerSungazing(): boolean;
    static isPluginInstalled(name: string): boolean;
    static isSneakingControlsEnabled(): boolean;
    static isWordUnlocked(akWord: WordOfPower | null): boolean;
    static loadGame(name: string): void;
    static modPerkPoints(perkPoints: number): void;
    static playBink(asFilename: string, abInterruptible: boolean, abMuteAudio: boolean, abMuteMusic: boolean, abLetterbox: boolean): void;
    static precacheCharGen(): void;
    static precacheCharGenClear(): void;
    static queryStat(asStat: string): number;
    static quitToMainMenu(): void;
    static removeHavokConstraints(arFirstRef: ObjectReference | null, arFirstRefNodeName: string, arSecondRef: ObjectReference | null, arSecondRefNodeName: string): Promise<boolean>;
    static requestAutosave(): void;
    static requestModel(asModelName: string): void;
    static requestSave(): void;
    static saveGame(name: string): void;
    static sendWereWolfTransformation(): void;
    static serveTime(): void;
    static setAllowFlyingMountLandingRequests(abAllow: boolean): void;
    static setBeastForm(abEntering: boolean): void;
    static setCameraTarget(arTarget: Actor | null): void;
    static setGameSettingBool(setting: string, value: boolean): void;
    static setGameSettingFloat(setting: string, value: number): void;
    static setGameSettingInt(setting: string, value: number): void;
    static setGameSettingString(setting: string, value: string): void;
    static setHudCartMode(abSetCartMode: boolean): void;
    static setInChargen(abDisableSaving: boolean, abDisableWaiting: boolean, abShowControlsDisabledMessage: boolean): void;
    static setMiscStat(name: string, value: number): void;
    static setNthTintMaskColor(n: number, color: number): void;
    static setNthTintMaskTexturePath(path: string, n: number): void;
    static setPerkPoints(perkPoints: number): void;
    static setPlayerAIDriven(abAIDriven: boolean): void;
    static setPlayerExperience(exp: number): void;
    static setPlayerLevel(level: number): void;
    static setPlayerReportCrime(abReportCrime: boolean): void;
    static setPlayersLastRiddenHorse(horse: Actor | null): void;
    static setSittingRotation(afValue: number): void;
    static setSunGazeImageSpaceModifier(apImod: ImageSpaceModifier | null): void;
    static setTintMaskColor(color: number, type: number, index: number): void;
    static setTintMaskTexturePath(path: string, type: number, index: number): void;
    static showFirstPersonGeometry(abShow: boolean): void;
    static showLimitedRaceMenu(): void;
    static showRaceMenu(): void;
    static showTitleSequenceMenu(): void;
    static showTrainingMenu(aTrainer: Actor | null): void;
    static startTitleSequence(asSequenceName: string): void;
    static teachWord(akWord: WordOfPower | null): void;
    static triggerScreenBlood(aiValue: number): void;
    static unbindObjectHotkey(hotkey: number): void;
    static unlockWord(akWord: WordOfPower | null): void;
    static updateHairColor(): void;
    static updateThirdPerson(): void;
    static updateTintMaskColors(): void;
    static usingGamepad(): boolean;
    static getPlayer(): Actor | null;
    static shakeCamera(akSource: ObjectReference | null, afStrength: number, afDuration: number): void;
    static shakeController(afSmallMotorStrength: number, afBigMotorStreangth: number, afDuration: number): void;
}
export declare class GlobalVariable extends Form {
    static from(papyrusObject: PapyrusObject | null): GlobalVariable | null;
    getValue(): number;
    setValue(param1: number): void;
}
export declare class Hazard extends Form {
    static from(papyrusObject: PapyrusObject | null): Hazard | null;
}
export declare class HeadPart extends Form {
    static from(papyrusObject: PapyrusObject | null): HeadPart | null;
    getIndexOfExtraPart(p: HeadPart | null): number;
    getNthExtraPart(n: number): HeadPart | null;
    getNumExtraParts(): number;
    getPartName(): string;
    getType(): number;
    getValidRaces(): FormList | null;
    hasExtraPart(p: HeadPart | null): boolean;
    isExtraPart(): boolean;
    setValidRaces(vRaces: FormList | null): void;
    static getHeadPart(name: string): HeadPart | null;
}
export declare class Idle extends Form {
    static from(papyrusObject: PapyrusObject | null): Idle | null;
}
export declare class ImageSpaceModifier extends Form {
    static from(papyrusObject: PapyrusObject | null): ImageSpaceModifier | null;
    apply(param1: number): void;
    applyCrossFade(param1: number): void;
    popTo(param1: ImageSpaceModifier | null, param2: number): void;
    remove(): void;
    static removeCrossFade(param1: number): void;
}
export declare class ImpactDataSet extends Form {
    static from(papyrusObject: PapyrusObject | null): ImpactDataSet | null;
}
export declare class Ingredient extends Form {
    static from(papyrusObject: PapyrusObject | null): Ingredient | null;
    getCostliestEffectIndex(): number;
    getEffectAreas(): number[] | null;
    getEffectDurations(): number[] | null;
    getEffectMagnitudes(): number[] | null;
    getIsNthEffectKnown(index: number): boolean;
    getMagicEffects(): PapyrusObject[] | null;
    getNthEffectArea(index: number): number;
    getNthEffectDuration(index: number): number;
    getNthEffectMagicEffect(index: number): MagicEffect | null;
    getNthEffectMagnitude(index: number): number;
    getNumEffects(): number;
    isHostile(): boolean;
    learnAllEffects(): void;
    learnEffect(aiIndex: number): void;
    learnNextEffect(): number;
    setNthEffectArea(index: number, value: number): void;
    setNthEffectDuration(index: number, value: number): void;
    setNthEffectMagnitude(index: number, value: number): void;
}
export declare class Input extends PapyrusObject {
    static from(papyrusObject: PapyrusObject | null): Input | null;
    static getMappedControl(keycode: number): string;
    static getMappedKey(control: string, deviceType: number): number;
    static getNthKeyPressed(n: number): number;
    static getNumKeysPressed(): number;
    static holdKey(dxKeycode: number): void;
    static isKeyPressed(dxKeycode: number): boolean;
    static releaseKey(dxKeycode: number): void;
    static tapKey(dxKeycode: number): void;
}
export declare class Key extends MiscObject {
    static from(papyrusObject: PapyrusObject | null): Key | null;
}
export declare class Keyword extends Form {
    static from(papyrusObject: PapyrusObject | null): Keyword | null;
    getString(): string;
    sendStoryEvent(akLoc: Location | null, akRef1: ObjectReference | null, akRef2: ObjectReference | null, aiValue1: number, aiValue2: number): void;
    sendStoryEventAndWait(akLoc: Location | null, akRef1: ObjectReference | null, akRef2: ObjectReference | null, aiValue1: number, aiValue2: number): Promise<boolean>;
    static getKeyword(key: string): Keyword | null;
}
export declare class LeveledActor extends Form {
    static from(papyrusObject: PapyrusObject | null): LeveledActor | null;
    addForm(apForm: Form | null, aiLevel: number): void;
    getNthCount(n: number): number;
    getNthForm(n: number): Form | null;
    getNthLevel(n: number): number;
    getNumForms(): number;
    revert(): void;
    setNthCount(n: number, count: number): void;
    setNthLevel(n: number, level: number): void;
}
export declare class LeveledItem extends Form {
    static from(papyrusObject: PapyrusObject | null): LeveledItem | null;
    addForm(apForm: Form | null, aiLevel: number, aiCount: number): void;
    getChanceGlobal(): GlobalVariable | null;
    getChanceNone(): number;
    getNthCount(n: number): number;
    getNthForm(n: number): Form | null;
    getNthLevel(n: number): number;
    getNumForms(): number;
    revert(): void;
    setChanceGlobal(glob: GlobalVariable | null): void;
    setChanceNone(chance: number): void;
    setNthCount(n: number, count: number): void;
    setNthLevel(n: number, level: number): void;
}
export declare class LeveledSpell extends Form {
    static from(papyrusObject: PapyrusObject | null): LeveledSpell | null;
    addForm(apForm: Form | null, aiLevel: number): void;
    getChanceNone(): number;
    getNthForm(n: number): Form | null;
    getNthLevel(n: number): number;
    getNumForms(): number;
    revert(): void;
    setChanceNone(chance: number): void;
    setNthLevel(n: number, level: number): void;
}
export declare class Light extends Form {
    static from(papyrusObject: PapyrusObject | null): Light | null;
    getWarmthRating(): number;
}
export declare class Location extends Form {
    static from(papyrusObject: PapyrusObject | null): Location | null;
    getKeywordData(param1: Keyword | null): number;
    getRefTypeAliveCount(param1: LocationRefType | null): number;
    getRefTypeDeadCount(param1: LocationRefType | null): number;
    hasCommonParent(param1: Location | null, param2: Keyword | null): boolean;
    hasRefType(param1: LocationRefType | null): boolean;
    isChild(param1: Location | null): boolean;
    isCleared(): boolean;
    isLoaded(): boolean;
    setCleared(param1: boolean): void;
    setKeywordData(param1: Keyword | null, param2: number): void;
}
export declare class LocationAlias extends Alias {
    static from(papyrusObject: PapyrusObject | null): LocationAlias | null;
    clear(): void;
    forceLocationTo(param1: Location | null): void;
    getLocation(): Location | null;
}
export declare class LocationRefType extends Keyword {
    static from(papyrusObject: PapyrusObject | null): LocationRefType | null;
}
export declare class MagicEffect extends Form {
    static from(papyrusObject: PapyrusObject | null): MagicEffect | null;
    clearEffectFlag(flag: number): void;
    getArea(): number;
    getAssociatedSkill(): Promise<string>;
    getBaseCost(): number;
    getCastTime(): number;
    getCastingArt(): Art | null;
    getCastingType(): number;
    getDeliveryType(): number;
    getEnchantArt(): Art | null;
    getEnchantShader(): EffectShader | null;
    getEquipAbility(): Spell | null;
    getExplosion(): Explosion | null;
    getHitEffectArt(): Art | null;
    getHitShader(): EffectShader | null;
    getImageSpaceMod(): ImageSpaceModifier | null;
    getImpactDataSet(): ImpactDataSet | null;
    getLight(): Light | null;
    getPerk(): Perk | null;
    getProjectile(): Projectile | null;
    getResistance(): string;
    getSkillLevel(): number;
    getSkillUsageMult(): number;
    getSounds(): PapyrusObject[] | null;
    isEffectFlagSet(flag: number): boolean;
    setArea(area: number): void;
    setAssociatedSkill(skill: string): void;
    setBaseCost(cost: number): void;
    setCastTime(castTime: number): void;
    setCastingArt(obj: Art | null): void;
    setEffectFlag(flag: number): void;
    setEnchantArt(obj: Art | null): void;
    setEnchantShader(obj: EffectShader | null): void;
    setEquipAbility(obj: Spell | null): void;
    setExplosion(obj: Explosion | null): void;
    setHitEffectArt(obj: Art | null): void;
    setHitShader(obj: EffectShader | null): void;
    setImageSpaceMod(obj: ImageSpaceModifier | null): void;
    setImpactDataSet(obj: ImpactDataSet | null): void;
    setLight(obj: Light | null): void;
    setPerk(obj: Perk | null): void;
    setProjectile(obj: Projectile | null): void;
    setResistance(skill: string): void;
    setSkillLevel(level: number): void;
    setSkillUsageMult(usageMult: number): void;
}
export declare class Message extends Form {
    static from(papyrusObject: PapyrusObject | null): Message | null;
    show(param1: number, param2: number, param3: number, param4: number, param5: number, param6: number, param7: number, param8: number, param9: number): Promise<number>;
    showAsHelpMessage(param1: string, param2: number, param3: number, param4: number): void;
    static resetHelpMessage(param1: string): void;
}
export declare class MusicType extends Form {
    static from(papyrusObject: PapyrusObject | null): MusicType | null;
    add(): void;
    remove(): void;
}
export declare class NetImmerse extends PapyrusObject {
    static from(papyrusObject: PapyrusObject | null): NetImmerse | null;
    static getNodeLocalPosition(ref: ObjectReference | null, node: string, _in: number[] | null, firstPerson: boolean): boolean;
    static getNodeLocalPositionX(ref: ObjectReference | null, node: string, firstPerson: boolean): number;
    static getNodeLocalPositionY(ref: ObjectReference | null, node: string, firstPerson: boolean): number;
    static getNodeLocalPositionZ(ref: ObjectReference | null, node: string, firstPerson: boolean): number;
    static getNodeLocalRotationEuler(ref: ObjectReference | null, node: string, _in: number[] | null, firstPerson: boolean): boolean;
    static getNodeLocalRotationMatrix(ref: ObjectReference | null, node: string, _in: number[] | null, firstPerson: boolean): boolean;
    static getNodeScale(ref: ObjectReference | null, node: string, firstPerson: boolean): number;
    static getNodeWorldPosition(ref: ObjectReference | null, node: string, _in: number[] | null, firstPerson: boolean): boolean;
    static getNodeWorldPositionX(ref: ObjectReference | null, node: string, firstPerson: boolean): number;
    static getNodeWorldPositionY(ref: ObjectReference | null, node: string, firstPerson: boolean): number;
    static getNodeWorldPositionZ(ref: ObjectReference | null, node: string, firstPerson: boolean): number;
    static getNodeWorldRotationEuler(ref: ObjectReference | null, node: string, _in: number[] | null, firstPerson: boolean): boolean;
    static getNodeWorldRotationMatrix(ref: ObjectReference | null, node: string, _in: number[] | null, firstPerson: boolean): boolean;
    static getRelativeNodePosition(ref: ObjectReference | null, nodeA: string, nodeB: string, _in: number[] | null, firstPerson: boolean): boolean;
    static getRelativeNodePositionX(ref: ObjectReference | null, nodeA: string, nodeB: string, firstPerson: boolean): number;
    static getRelativeNodePositionY(ref: ObjectReference | null, nodeA: string, nodeB: string, firstPerson: boolean): number;
    static getRelativeNodePositionZ(ref: ObjectReference | null, nodeA: string, nodeB: string, firstPerson: boolean): number;
    static hasNode(ref: ObjectReference | null, node: string, firstPerson: boolean): boolean;
    static setNodeLocalPosition(ref: ObjectReference | null, node: string, _in: number[] | null, firstPerson: boolean): boolean;
    static setNodeLocalPositionX(ref: ObjectReference | null, node: string, x: number, firstPerson: boolean): void;
    static setNodeLocalPositionY(ref: ObjectReference | null, node: string, y: number, firstPerson: boolean): void;
    static setNodeLocalPositionZ(ref: ObjectReference | null, node: string, z: number, firstPerson: boolean): void;
    static setNodeLocalRotationEuler(ref: ObjectReference | null, node: string, _in: number[] | null, firstPerson: boolean): boolean;
    static setNodeLocalRotationMatrix(ref: ObjectReference | null, node: string, _in: number[] | null, firstPerson: boolean): boolean;
    static setNodeScale(ref: ObjectReference | null, node: string, scale: number, firstPerson: boolean): void;
    static setNodeTextureSet(ref: ObjectReference | null, node: string, tSet: TextureSet | null, firstPerson: boolean): void;
}
export declare class Outfit extends Form {
    static from(papyrusObject: PapyrusObject | null): Outfit | null;
    getNthPart(n: number): Form | null;
    getNumParts(): number;
}
export declare class Projectile extends Form {
    static from(papyrusObject: PapyrusObject | null): Projectile | null;
}
export declare class Package extends Form {
    static from(papyrusObject: PapyrusObject | null): Package | null;
    getOwningQuest(): Quest | null;
    getTemplate(): Package | null;
}
export declare class Perk extends Form {
    static from(papyrusObject: PapyrusObject | null): Perk | null;
    getNextPerk(): Perk | null;
    getNthEntryLeveledList(n: number): LeveledItem | null;
    getNthEntryPriority(n: number): number;
    getNthEntryQuest(n: number): Quest | null;
    getNthEntryRank(n: number): number;
    getNthEntrySpell(n: number): Spell | null;
    getNthEntryStage(n: number): number;
    getNthEntryText(n: number): string;
    getNthEntryValue(n: number, i: number): number;
    getNumEntries(): number;
    setNthEntryLeveledList(n: number, lList: LeveledItem | null): boolean;
    setNthEntryPriority(n: number, priority: number): boolean;
    setNthEntryQuest(n: number, newQuest: Quest | null): boolean;
    setNthEntryRank(n: number, rank: number): boolean;
    setNthEntrySpell(n: number, newSpell: Spell | null): boolean;
    setNthEntryStage(n: number, stage: number): boolean;
    setNthEntryText(n: number, newText: string): boolean;
    setNthEntryValue(n: number, i: number, value: number): boolean;
}
export declare class Potion extends Form {
    static from(papyrusObject: PapyrusObject | null): Potion | null;
    getCostliestEffectIndex(): number;
    getEffectAreas(): number[] | null;
    getEffectDurations(): number[] | null;
    getEffectMagnitudes(): number[] | null;
    getMagicEffects(): PapyrusObject[] | null;
    getNthEffectArea(index: number): number;
    getNthEffectDuration(index: number): number;
    getNthEffectMagicEffect(index: number): MagicEffect | null;
    getNthEffectMagnitude(index: number): number;
    getNumEffects(): number;
    getUseSound(): SoundDescriptor | null;
    isFood(): boolean;
    isHostile(): boolean;
    isPoison(): boolean;
    setNthEffectArea(index: number, value: number): void;
    setNthEffectDuration(index: number, value: number): void;
    setNthEffectMagnitude(index: number, value: number): void;
}
export declare class Quest extends Form {
    static from(papyrusObject: PapyrusObject | null): Quest | null;
    completeAllObjectives(): void;
    completeQuest(): void;
    failAllObjectives(): void;
    getAlias(aiAliasID: number): Alias | null;
    getAliasById(aliasId: number): Alias | null;
    getAliasByName(name: string): Alias | null;
    getAliases(): PapyrusObject[] | null;
    getCurrentStageID(): number;
    getID(): string;
    getNthAlias(index: number): Alias | null;
    getNumAliases(): number;
    getPriority(): number;
    isActive(): boolean;
    isCompleted(): boolean;
    isObjectiveCompleted(aiObjective: number): boolean;
    isObjectiveDisplayed(aiObjective: number): boolean;
    isObjectiveFailed(aiObjective: number): boolean;
    isRunning(): boolean;
    isStageDone(aiStage: number): boolean;
    isStarting(): boolean;
    isStopped(): boolean;
    isStopping(): boolean;
    reset(): void;
    setActive(abActive: boolean): void;
    setCurrentStageID(aiStageID: number): Promise<boolean>;
    setObjectiveCompleted(aiObjective: number, abCompleted: boolean): void;
    setObjectiveDisplayed(aiObjective: number, abDisplayed: boolean, abForce: boolean): void;
    setObjectiveFailed(aiObjective: number, abFailed: boolean): void;
    start(): Promise<boolean>;
    stop(): void;
    updateCurrentInstanceGlobal(aUpdateGlobal: GlobalVariable | null): boolean;
    static getQuest(editorId: string): Quest | null;
}
export declare class Race extends Form {
    static from(papyrusObject: PapyrusObject | null): Race | null;
    clearRaceFlag(n: number): void;
    getDefaultVoiceType(female: boolean): VoiceType | null;
    getNthSpell(n: number): Spell | null;
    getSkin(): Armor | null;
    getSpellCount(): number;
    isRaceFlagSet(n: number): boolean;
    setDefaultVoiceType(female: boolean, voice: VoiceType | null): void;
    setRaceFlag(n: number): void;
    setSkin(skin: Armor | null): void;
    static getNthPlayableRace(n: number): Race | null;
    static getNumPlayableRaces(): number;
    static getRace(editorId: string): Race | null;
}
export declare class ReferenceAlias extends Alias {
    static from(papyrusObject: PapyrusObject | null): ReferenceAlias | null;
    addInventoryEventFilter(param1: Form | null): void;
    clear(): void;
    forceRefTo(param1: ObjectReference | null): void;
    getReference(): ObjectReference | null;
    removeAllInventoryEventFilters(): void;
    removeInventoryEventFilter(param1: Form | null): void;
}
export declare class Spell extends Form {
    static from(papyrusObject: PapyrusObject | null): Spell | null;
    cast(akSource: ObjectReference | null, akTarget: ObjectReference | null): Promise<void>;
    getCastTime(): number;
    getCostliestEffectIndex(): number;
    getEffectAreas(): number[] | null;
    getEffectDurations(): number[] | null;
    getEffectMagnitudes(): number[] | null;
    getEffectiveMagickaCost(caster: Actor | null): number;
    getEquipType(): EquipSlot | null;
    getMagicEffects(): PapyrusObject[] | null;
    getMagickaCost(): number;
    getNthEffectArea(index: number): number;
    getNthEffectDuration(index: number): number;
    getNthEffectMagicEffect(index: number): MagicEffect | null;
    getNthEffectMagnitude(index: number): number;
    getNumEffects(): number;
    getPerk(): Perk | null;
    isHostile(): boolean;
    preload(): void;
    remoteCast(akSource: ObjectReference | null, akBlameActor: Actor | null, akTarget: ObjectReference | null): Promise<void>;
    setEquipType(type: EquipSlot | null): void;
    setNthEffectArea(index: number, value: number): void;
    setNthEffectDuration(index: number, value: number): void;
    setNthEffectMagnitude(index: number, value: number): void;
    unload(): void;
}
export declare class Static extends Form {
    static from(papyrusObject: PapyrusObject | null): Static | null;
}
export declare class Scene extends Form {
    static from(papyrusObject: PapyrusObject | null): Scene | null;
    forceStart(): void;
    getOwningQuest(): Quest | null;
    isActionComplete(param1: number): boolean;
    isPlaying(): boolean;
    start(): void;
    stop(): void;
}
export declare class Scroll extends Form {
    static from(papyrusObject: PapyrusObject | null): Scroll | null;
    cast(akSource: ObjectReference | null, akTarget: ObjectReference | null): Promise<void>;
    getCastTime(): number;
    getCostliestEffectIndex(): number;
    getEffectAreas(): number[] | null;
    getEffectDurations(): number[] | null;
    getEffectMagnitudes(): number[] | null;
    getEquipType(): EquipSlot | null;
    getMagicEffects(): PapyrusObject[] | null;
    getNthEffectArea(index: number): number;
    getNthEffectDuration(index: number): number;
    getNthEffectMagicEffect(index: number): MagicEffect | null;
    getNthEffectMagnitude(index: number): number;
    getNumEffects(): number;
    getPerk(): Perk | null;
    setEquipType(type: EquipSlot | null): void;
    setNthEffectArea(index: number, value: number): void;
    setNthEffectDuration(index: number, value: number): void;
    setNthEffectMagnitude(index: number, value: number): void;
}
export declare class ShaderParticleGeometry extends Form {
    static from(papyrusObject: PapyrusObject | null): ShaderParticleGeometry | null;
    apply(param1: number): void;
    remove(param1: number): void;
}
export declare class Shout extends Form {
    static from(papyrusObject: PapyrusObject | null): Shout | null;
    getNthRecoveryTime(n: number): number;
    getNthSpell(n: number): Spell | null;
    getNthWordOfPower(n: number): WordOfPower | null;
    setNthRecoveryTime(n: number, time: number): void;
    setNthSpell(n: number, aSpell: Spell | null): void;
    setNthWordOfPower(n: number, aWoop: WordOfPower | null): void;
}
export declare class SoulGem extends MiscObject {
    static from(papyrusObject: PapyrusObject | null): SoulGem | null;
    getGemSize(): number;
    getSoulSize(): number;
}
export declare class Sound extends Form {
    static from(papyrusObject: PapyrusObject | null): Sound | null;
    getDescriptor(): SoundDescriptor | null;
    play(akSource: ObjectReference | null): number;
    playAndWait(akSource: ObjectReference | null): Promise<boolean>;
    static setInstanceVolume(aiPlaybackInstance: number, afVolume: number): void;
    static stopInstance(aiPlaybackInstance: number): void;
}
export declare class SoundCategory extends Form {
    static from(papyrusObject: PapyrusObject | null): SoundCategory | null;
    mute(): void;
    pause(): void;
    setFrequency(param1: number): void;
    setVolume(param1: number): void;
    unMute(): void;
    unPause(): void;
}
export declare class SoundDescriptor extends Form {
    static from(papyrusObject: PapyrusObject | null): SoundDescriptor | null;
    getDecibelAttenuation(): number;
    getDecibelVariance(): number;
    getFrequencyShift(): number;
    getFrequencyVariance(): number;
    setDecibelAttenuation(dbAttenuation: number): void;
    setDecibelVariance(dbVariance: number): void;
    setFrequencyShift(frequencyShift: number): void;
    setFrequencyVariance(frequencyVariance: number): void;
}
export declare class TESModPlatform extends PapyrusObject {
    static from(papyrusObject: PapyrusObject | null): TESModPlatform | null;
    static addItemEx(containerRefr: ObjectReference | null, item: Form | null, countDelta: number, health: number, enchantment: Enchantment | null, maxCharge: number, removeEnchantmentOnUnequip: boolean, chargePercent: number, textDisplayData: string, soul: number, poison: Potion | null, poisonCount: number): void;
    static clearTintMasks(targetActor: Actor | null): void;
    static createNpc(): ActorBase | null;
    static getNthVtableElement(pointer: Form | null, pointerOffset: number, elementIndex: number): number;
    static getSkinColor(base: ActorBase | null): ColorForm | null;
    static isPlayerRunningEnabled(): boolean;
    static moveRefrToPosition(refr: ObjectReference | null, cell: Cell | null, world: WorldSpace | null, posX: number, posY: number, posZ: number, rotX: number, rotY: number, rotZ: number): void;
    static pushTintMask(targetActor: Actor | null, type: number, argb: number, texturePath: string): void;
    static pushWornState(worn: boolean, wornLeft: boolean): void;
    static resetContainer(container: Form | null): void;
    static resizeHeadpartsArray(npc: ActorBase | null, newSize: number): void;
    static resizeTintsArray(newSize: number): void;
    static setFormIdUnsafe(Form: Form | null, newId: number): void;
    static setNpcHairColor(npc: ActorBase | null, hairColor: number): void;
    static setNpcRace(npc: ActorBase | null, race: Race | null): void;
    static setNpcSex(npc: ActorBase | null, sex: number): void;
    static setNpcSkinColor(npc: ActorBase | null, skinColor: number): void;
    static setWeaponDrawnMode(actor: Actor | null, mode: number): void;
    static updateEquipment(actor: Actor | null, item: Form | null, leftHand: boolean): void;
}
export declare class TalkingActivator extends Activator {
    static from(papyrusObject: PapyrusObject | null): TalkingActivator | null;
}
export declare class TextureSet extends Form {
    static from(papyrusObject: PapyrusObject | null): TextureSet | null;
    getNthTexturePath(n: number): string;
    getNumTexturePaths(): number;
    setNthTexturePath(n: number, texturePath: string): void;
}
export declare class Topic extends Form {
    static from(papyrusObject: PapyrusObject | null): Topic | null;
    add(): void;
}
export declare class TopicInfo extends Form {
    static from(papyrusObject: PapyrusObject | null): TopicInfo | null;
    getOwningQuest(): Quest | null;
}
export declare class TreeObject extends Form {
    static from(papyrusObject: PapyrusObject | null): TreeObject | null;
    getHarvestSound(): SoundDescriptor | null;
    getIngredient(): Form | null;
    setHarvestSound(akSoundDescriptor: SoundDescriptor | null): void;
    setIngredient(akIngredient: Form | null): void;
}
export declare class Ui extends PapyrusObject {
    static from(papyrusObject: PapyrusObject | null): Ui | null;
    static closeCustomMenu(): void;
    static getBool(menuName: string, target: string): boolean;
    static getFloat(menuName: string, target: string): number;
    static getInt(menuName: string, target: string): number;
    static getString(menuName: string, target: string): string;
    static invokeBool(menuName: string, target: string, arg: boolean): void;
    static invokeBoolA(menuName: string, target: string, args: boolean[] | null): void;
    static invokeFloat(menuName: string, target: string, arg: number): void;
    static invokeFloatA(menuName: string, target: string, args: number[] | null): void;
    static invokeForm(menuName: string, target: string, arg: Form | null): void;
    static invokeInt(menuName: string, target: string, arg: number): void;
    static invokeIntA(menuName: string, target: string, args: number[] | null): void;
    static invokeString(menuName: string, target: string, arg: string): void;
    static invokeStringA(menuName: string, target: string, args: string[] | null): void;
    static isMenuOpen(menuName: string): boolean;
    static isTextInputEnabled(): boolean;
    static openCustomMenu(swfPath: string, flags: number): void;
    static setBool(menuName: string, target: string, value: boolean): void;
    static setFloat(menuName: string, target: string, value: number): void;
    static setInt(menuName: string, target: string, value: number): void;
    static setString(menuName: string, target: string, value: string): void;
}
export declare class VisualEffect extends Form {
    static from(papyrusObject: PapyrusObject | null): VisualEffect | null;
    play(param1: ObjectReference | null, param2: number, param3: ObjectReference | null): void;
    stop(param1: ObjectReference | null): void;
}
export declare class VoiceType extends Form {
    static from(papyrusObject: PapyrusObject | null): VoiceType | null;
}
export declare class Weapon extends Form {
    static from(papyrusObject: PapyrusObject | null): Weapon | null;
    fire(akSource: ObjectReference | null, akAmmo: Ammo | null): void;
    getBaseDamage(): number;
    getCritDamage(): number;
    getCritEffect(): Spell | null;
    getCritEffectOnDeath(): boolean;
    getCritMultiplier(): number;
    getEnchantment(): Enchantment | null;
    getEnchantmentValue(): number;
    getEquipType(): EquipSlot | null;
    getEquippedModel(): Static | null;
    getIconPath(): string;
    getMaxRange(): number;
    getMessageIconPath(): string;
    getMinRange(): number;
    getModelPath(): string;
    getReach(): number;
    getResist(): string;
    getSkill(): string;
    getSpeed(): number;
    getStagger(): number;
    getTemplate(): Weapon | null;
    getWeaponType(): number;
    setBaseDamage(damage: number): void;
    setCritDamage(damage: number): void;
    setCritEffect(ce: Spell | null): void;
    setCritEffectOnDeath(ceod: boolean): void;
    setCritMultiplier(crit: number): void;
    setEnchantment(e: Enchantment | null): void;
    setEnchantmentValue(value: number): void;
    setEquipType(type: EquipSlot | null): void;
    setEquippedModel(model: Static | null): void;
    setIconPath(path: string): void;
    setMaxRange(maxRange: number): void;
    setMessageIconPath(path: string): void;
    setMinRange(minRange: number): void;
    setModelPath(path: string): void;
    setReach(reach: number): void;
    setResist(resist: string): void;
    setSkill(skill: string): void;
    setSpeed(speed: number): void;
    setStagger(stagger: number): void;
    setWeaponType(type: number): void;
}
export declare class Weather extends Form {
    static from(papyrusObject: PapyrusObject | null): Weather | null;
    forceActive(abOverride: boolean): void;
    getClassification(): number;
    getFogDistance(day: boolean, type: number): number;
    getSunDamage(): number;
    getSunGlare(): number;
    getWindDirection(): number;
    getWindDirectionRange(): number;
    setActive(abOverride: boolean, abAccelerate: boolean): void;
    static findWeather(auiType: number): Weather | null;
    static getCurrentWeather(): Weather | null;
    static getCurrentWeatherTransition(): number;
    static getOutgoingWeather(): Weather | null;
    static getSkyMode(): number;
    static releaseOverride(): void;
}
export declare class WordOfPower extends Form {
    static from(papyrusObject: PapyrusObject | null): WordOfPower | null;
}
export declare class WorldSpace extends Form {
    static from(papyrusObject: PapyrusObject | null): WorldSpace | null;
}
export declare class Utility extends PapyrusObject {
    static from(papyrusObject: PapyrusObject | null): Utility | null;
    static captureFrameRate(numFrames: number): string;
    static createAliasArray(size: number, fill: Alias | null): PapyrusObject[] | null;
    static createBoolArray(size: number, fill: boolean): boolean[] | null;
    static createFloatArray(size: number, fill: number): number[] | null;
    static createFormArray(size: number, fill: Form | null): PapyrusObject[] | null;
    static createIntArray(size: number, fill: number): number[] | null;
    static createStringArray(size: number, fill: string): string[] | null;
    static endFrameRateCapture(): void;
    static gameTimeToString(afGameTime: number): Promise<string>;
    static getAverageFrameRate(): number;
    static getBudgetCount(): number;
    static getBudgetName(aiBudgetNumber: number): string;
    static getCurrentBudget(aiBudgetNumber: number): number;
    static getCurrentGameTime(): number;
    static getCurrentMemory(): number;
    static getCurrentRealTime(): number;
    static getINIBool(ini: string): boolean;
    static getINIFloat(ini: string): number;
    static getINIInt(ini: string): number;
    static getINIString(ini: string): string;
    static getMaxFrameRate(): number;
    static getMinFrameRate(): number;
    static isInMenuMode(): boolean;
    static overBudget(aiBudgetNumber: number): boolean;
    static randomFloat(afMin: number, afMax: number): number;
    static randomInt(aiMin: number, aiMax: number): number;
    static resizeAliasArray(source: PapyrusObject[] | null, size: number, fill: Alias | null): PapyrusObject[] | null;
    static resizeBoolArray(source: boolean[] | null, size: number, fill: boolean): boolean[] | null;
    static resizeFloatArray(source: number[] | null, size: number, fill: number): number[] | null;
    static resizeFormArray(source: PapyrusObject[] | null, size: number, fill: Form | null): PapyrusObject[] | null;
    static resizeIntArray(source: number[] | null, size: number, fill: number): number[] | null;
    static resizeStringArray(source: string[] | null, size: number, fill: string): string[] | null;
    static setINIBool(ini: string, value: boolean): void;
    static setINIFloat(ini: string, value: number): void;
    static setINIInt(ini: string, value: number): void;
    static setINIString(ini: string, value: string): void;
    static startFrameRateCapture(): void;
    static wait(afSeconds: number): Promise<void>;
    static waitGameTime(afHours: number): Promise<void>;
    static waitMenuMode(afSeconds: number): Promise<void>;
}
export {};
